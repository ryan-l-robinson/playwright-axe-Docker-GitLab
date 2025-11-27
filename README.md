# Overview

This project is now archived, as I migrated it to [my GitLab](https://gitlab.com/ryan-l-robinson/playwright-axe-Docker-GitLab) instead. It makes more sense there where I can actually test it.

This project builds a testing image with playwright and axe-core accessibility testing, and stores it in the GitLab container registry. This avoids building it every time the job is invoked.

This can be invoked as the image for GitLab CI/CD scripts on specific projects. See some examples of that in the [GitLab CI/CD demo project](https://github.com/ryan-l-robinson/GitLab-CI-CD). To access the image and run the tests:

1. Pass in any variables or prepare any other prerequisites such as files in the correct locations for the tests.
2. Approve that this image can be used by the other project, from this GitLab project -> Settings -> CI/CD -> Access Tokens.

Tests are structured to allow for some tests that run only on a separate local container, some that run only on CI/CD (within this container), and some that run on both. Tests are also split up between those that run on both desktop and mobile browsers and those that only run on mobile. This allows for combining project-specific tests with the general one provided here.

One general CI/CD test is included, which reads from the sitemap and reports on any vulnerabilities detected by axe-core. This requires that the sitemap is copied to /opt/playwright/sitemap.xml. 
