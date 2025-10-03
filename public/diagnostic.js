/**
 * Test Script for Cutting Mat Designer
 * Run this in the browser console to diagnose issues
 */

console.log('🔍 Cutting Mat Designer - Diagnostic Test');
console.log('==========================================\n');

// Test 1: Check if root element exists
const root = document.getElementById('root');
console.log('✓ Test 1: Root element exists:', !!root);
if (root) {
  console.log('  - Has children:', root.children.length > 0);
  console.log('  - First child:', root.children[0]?.tagName);
}

// Test 2: Check localStorage
console.log('\n✓ Test 2: LocalStorage check');
try {
  const config = localStorage.getItem('cutting-mat-config');
  if (config) {
    const parsed = JSON.parse(config);
    console.log('  - Config exists:', !!config);
    console.log('  - Has font property:', !!parsed.font);
    console.log('  - Font config:', parsed.font);
  } else {
    console.log('  - No saved config (using defaults)');
  }
} catch (e) {
  console.error('  - Error reading config:', e);
}

// Test 3: Check React rendering
console.log('\n✓ Test 3: React rendering check');
const reactRoot = document.querySelector('#root > div');
console.log('  - React has rendered:', !!reactRoot);
if (reactRoot) {
  console.log('  - Root div classes:', reactRoot.className);
}

// Test 4: Check for errors
console.log('\n✓ Test 4: Error check');
console.log('  - Check console above for any React errors');

// Test 5: Quick fix function
console.log('\n✓ Test 5: Quick fix available');
console.log('  - To clear config and reload, run: clearConfigAndReload()');

window.clearConfigAndReload = function() {
  console.log('🔄 Clearing config and reloading...');
  localStorage.removeItem('cutting-mat-config');
  location.reload();
};

console.log('\n==========================================');
console.log('If the page is blank, try: clearConfigAndReload()');
console.log('==========================================\n');
