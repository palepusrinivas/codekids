#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
original_path = os.path.join(script_dir, '../codekids_tech-main/app/codekids-pro/pricing/page.tsx')
output_path = os.path.join(script_dir, 'src/pages/CodeKidsProPricing.tsx')

print(f"Reading: {original_path}")
with open(original_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original: {len(content)} chars, {len(content.splitlines())} lines")

# Conversions
content = content.replace("'use client';", "import { Helmet } from 'react-helmet-async';")
content = content.replace("import Image from 'next/image';", "import Image from '@/components/Image';")
content = content.replace("import Link from 'next/link';", "import { Link } from 'react-router-dom';")
content = re.sub(r'quality=\{90\}', '', content)
content = re.sub(r'\s+unoptimized', '', content)
content = re.sub(r'prefetch=\{true\}', '', content)
content = content.replace('href="/contact?type=demo"', 'to="/contact?type=demo"')
content = re.sub(r'href="#([^"]*)"', r'to="#\1" onClick={(e) => handleAnchorClick(e, "#\1")}', content)
content = re.sub(r'return \(\s*<div', '''return (
    <>
      <Helmet>
        <title>CodeKids Pro Pricing | Career-Focused Tech Programs | CodeKids Technologies</title>
        <meta name="description" content="CodeKids Pro offers career-focused tech programs with guaranteed internships and job placement assistance. Online and offline courses starting from ₹1,500. Transform your career today!" />
        <meta name="keywords" content="codekids pro pricing, tech courses price, coding bootcamp, career transition programs, job placement courses, internship guaranteed" />
      </Helmet>
      <div''', content)
content = re.sub(r'    </div>\s*\);', '''    </div>
    </>
  );''', content)

print(f"Writing: {output_path}")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Done: {len(content)} chars, {len(content.splitlines())} lines")

