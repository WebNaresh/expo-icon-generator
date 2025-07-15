#!/usr/bin/env node

/**
 * Test script to verify canonical URL configuration
 * 
 * This script tests:
 * 1. Trailing slash redirects
 * 2. Canonical HTML meta tags
 * 3. Canonical HTTP headers
 * 4. URL consistency across the application
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.SITE_URL || 'https://expo-assets-generator.vercel.app';
const TEST_PATHS = [
  '/',
  '/contributors',
  '/manifest.json',
];

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: url
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testCanonicalURL(path) {
  console.log(`\n🔍 Testing: ${path}`);
  
  try {
    // Test URL without trailing slash
    const urlWithoutSlash = `${BASE_URL}${path}`;
    const responseWithoutSlash = await makeRequest(urlWithoutSlash);
    
    console.log(`   ✅ URL without slash: ${urlWithoutSlash}`);
    console.log(`   📊 Status: ${responseWithoutSlash.statusCode}`);
    
    // Check for canonical HTTP header
    const canonicalHeader = responseWithoutSlash.headers.link;
    if (canonicalHeader && canonicalHeader.includes('rel="canonical"')) {
      console.log(`   ✅ Canonical HTTP header: ${canonicalHeader}`);
    } else {
      console.log(`   ⚠️  No canonical HTTP header found`);
    }
    
    // Check for canonical HTML meta tag
    const canonicalMetaMatch = responseWithoutSlash.body.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
    if (canonicalMetaMatch) {
      console.log(`   ✅ Canonical HTML meta: ${canonicalMetaMatch[0]}`);
    } else {
      console.log(`   ⚠️  No canonical HTML meta tag found`);
    }
    
    // Test URL with trailing slash (should redirect)
    if (path !== '/') {
      const urlWithSlash = `${BASE_URL}${path}/`;
      try {
        const responseWithSlash = await makeRequest(urlWithSlash);
        
        if (responseWithSlash.statusCode === 301 || responseWithSlash.statusCode === 302) {
          const location = responseWithSlash.headers.location;
          console.log(`   ✅ Trailing slash redirect: ${responseWithSlash.statusCode} → ${location}`);
          
          if (location === urlWithoutSlash) {
            console.log(`   ✅ Redirect target is correct`);
          } else {
            console.log(`   ❌ Redirect target mismatch: expected ${urlWithoutSlash}, got ${location}`);
          }
        } else {
          console.log(`   ❌ No redirect for trailing slash: ${responseWithSlash.statusCode}`);
        }
      } catch (error) {
        console.log(`   ⚠️  Error testing trailing slash: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.log(`   ❌ Error testing ${path}: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting Canonical URL Configuration Tests');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log('=' .repeat(60));
  
  for (const path of TEST_PATHS) {
    await testCanonicalURL(path);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Canonical URL tests completed!');
  console.log('\n📋 Summary:');
  console.log('   • All URLs should return 200 status');
  console.log('   • Canonical HTTP headers should be present');
  console.log('   • Canonical HTML meta tags should be present');
  console.log('   • Trailing slash URLs should redirect (301) to non-trailing slash');
  console.log('   • Redirect targets should match expected URLs');
}

// Run the tests
runTests().catch(console.error);
