#!/usr/bin/env node

import puppeteer from 'puppeteer';
import axe from 'axe-core';
import fs from 'fs/promises';
import {program} from 'commander';
import {EVIL_RULES} from '../lib/rules/index.js';

program
    .name('axe-evil-checker')
    .description('CLI to Enhanced Verification and Improvement for accessibiLity accessibility on web pages')
    .version('1.0.0')
    .option('-u, --url <url>', 'URL to test')
    .option('-f, --file <file>', 'File with URLs (one per line)')
    .option('-o, --output <file>', 'Output file (JSON format)')
    .option('-v, --verbose', 'Show detailed output')
    .parse(process.argv);

const options = program.opts();

if (!options.url && !options.file) {
    console.error('Please provide either a URL or a file with URLs');
    process.exit(1);
}

async function analyzeUrl(url, browser, verbose = false) {
    const page = await browser.newPage();
    if (verbose) {
        page.on('console', msg => console.log('Page log:', msg.text()));
    }

    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.evaluate(axe.source);

    for (const check of EVIL_RULES.checks) {
        await page.evaluate(check.evaluateCode);
    }

    return  await page.evaluate((rules, checks) => {

        window.axe.configure({
            rules: rules,
            checks: checks,
        });

        return window.axe.run(document, {
            runOnly: ["evil"],
        });
    }, EVIL_RULES.rules, EVIL_RULES.checks);

}


async function main() {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const results = [];

    try {
        if (options.url) {
            const result = await analyzeUrl(options.url, browser, options.verbose);
            results.push(result);

            if (options.verbose) {
                console.log(JSON.stringify(result, null, 2));
            }
        }

        if (options.file) {
            const urls = (await fs.readFile(options.file, 'utf-8'))
                .split('\n')
                .map(url => url.trim())
                .filter(Boolean);

            for (const url of urls) {
                const result = await analyzeUrl(url, browser, options.verbose);
                results.push(result);

                if (options.verbose) {
                    console.log(JSON.stringify(result, null, 2));
                }
            }
        }

        if (options.output) {
            await fs.writeFile(options.output, JSON.stringify(results, null, 2));
            if (options.verbose) {
                console.log(`Results saved to ${options.output}`);
            }
        } else {
            if (options.verbose) {
                console.log(JSON.stringify(results));
            }
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

main();