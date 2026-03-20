# DocGuard

DocGuard is a Canonical-Driven Development enforcement layer. It validates
your specs and docs with 19 automated validators — catching drift, stale
documentation, broken traceability, and spec inconsistencies before they
accumulate.

## What it adds to your project

- /docguard-guard — runs all 19 validators, triages findings by severity
- /docguard-review — semantic cross-document consistency analysis, read-only
- /docguard-fix — AI-driven documentation repair researching the real codebase
- /docguard-score — CDD maturity score with ROI-based improvement roadmap

## When the Mentor suggests it

The Mentor suggests DocGuard when it detects that a spec section would benefit
from automated enforcement — for example, when architecture rules, entity schemas,
or non-negotiables are defined but there is no mechanism to verify they stay
in sync with the codebase over time.

## Install

scofield extension add raccioly/docguard
