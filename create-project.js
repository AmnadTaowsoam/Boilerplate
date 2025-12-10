#!/usr/bin/env node

/**
 * Betagro Project Generator
 * 
 * Usage:
 *   node create-project.js <template-type> <project-name> [destination]
 * 
 * Templates:
 *   - backend-node    : Node.js Backend (Express + TypeScript + Prisma)
 *   - backend-python  : Python Backend (FastAPI + Uvicorn)
 *   - frontend        : React Frontend (Vite + TypeScript + Redux)
 * 
 * Examples:
 *   node create-project.js backend-node my-api
 *   node create-project.js frontend my-app ./projects
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showHelp() {
  log('\n📦 Betagro Project Generator', 'cyan');
  log('─'.repeat(50), 'cyan');
  log('\nUsage:', 'yellow');
  log('  node create-project.js <template-type> <project-name> [destination]\n');
  log('Available Templates:', 'yellow');
  log('  backend-node    Node.js Backend (Express + TypeScript + Prisma)', 'green');
  log('  backend-python  Python Backend (FastAPI + Uvicorn)', 'green');
  log('  frontend        React Frontend (Vite + TypeScript + Redux)', 'green');
  log('\nExamples:', 'yellow');
  log('  node create-project.js backend-node my-api');
  log('  node create-project.js frontend my-app ./projects');
  log('  node create-project.js backend-python ml-service ../other-folder\n');
  log('Documentation:', 'yellow');
  log('  See standards/07-approved-templates.md for template details\n');
}

const TEMPLATES = {
  'backend-node': {
    source: 'Backend_nodejs-Template/Backend_nodejs-Template',
    name: 'Node.js Backend',
    setupScript: 'scripts/setup-project.js',
  },
  'backend-python': {
    source: 'Backend_python-Template',
    name: 'Python Backend',
    setupScript: 'scripts/setup_project.py',
  },
  'frontend': {
    source: 'Frontend-Template/Frontend-Template',
    name: 'React Frontend',
    setupScript: 'scripts/setup-project.js',
  },
};

function validateProjectName(name) {
  const validPattern = /^[a-z][a-z0-9-]*$/;
  if (!validPattern.test(name)) {
    log('❌ Project name must:', 'red');
    log('   - Start with a lowercase letter', 'red');
    log('   - Contain only lowercase letters, numbers, and hyphens', 'red');
    log('   - Example: my-awesome-project', 'yellow');
    process.exit(1);
  }
  return name;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip node_modules, __pycache__, venv, .git
    if (['node_modules', '__pycache__', 'venv', '.git', 'dist', 'build'].includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    process.exit(0);
  }

  if (args.length < 2) {
    log('❌ Missing arguments', 'red');
    showHelp();
    process.exit(1);
  }

  const templateType = args[0];
  const projectName = validateProjectName(args[1]);
  const destination = args[2] || '.';

  // Validate template type
  if (!TEMPLATES[templateType]) {
    log(`❌ Unknown template type: ${templateType}`, 'red');
    log('\nAvailable templates:', 'yellow');
    Object.keys(TEMPLATES).forEach(t => {
      log(`  - ${t}: ${TEMPLATES[t].name}`, 'green');
    });
    process.exit(1);
  }

  const template = TEMPLATES[templateType];
  const rootDir = path.dirname(__filename);
  const sourcePath = path.join(rootDir, template.source);
  const destPath = path.resolve(destination, projectName);

  // Check if source exists
  if (!fs.existsSync(sourcePath)) {
    log(`❌ Template source not found: ${sourcePath}`, 'red');
    process.exit(1);
  }

  // Check if destination already exists
  if (fs.existsSync(destPath)) {
    log(`❌ Destination already exists: ${destPath}`, 'red');
    process.exit(1);
  }

  log(`\n🚀 Creating ${template.name} project: ${projectName}`, 'blue');
  log('─'.repeat(50), 'blue');

  // Copy template
  log(`  📁 Copying template from ${template.source}...`, 'cyan');
  copyDir(sourcePath, destPath);
  log(`  ✓ Template copied to ${destPath}`, 'green');

  // Run setup script if exists
  const setupScriptPath = path.join(destPath, template.setupScript);
  if (fs.existsSync(setupScriptPath)) {
    log(`  🔧 Running setup script...`, 'cyan');
    
    const originalDir = process.cwd();
    process.chdir(destPath);

    try {
      if (template.setupScript.endsWith('.py')) {
        execSync(`python ${template.setupScript} ${projectName}`, { stdio: 'inherit' });
      } else {
        execSync(`node ${template.setupScript} ${projectName}`, { stdio: 'inherit' });
      }
    } catch (error) {
      log('⚠️ Setup script encountered issues (may need manual configuration)', 'yellow');
    }

    process.chdir(originalDir);
  }

  log('\n─'.repeat(50), 'blue');
  log(`✅ Project "${projectName}" created successfully!`, 'green');
  log(`\n📍 Location: ${destPath}`, 'cyan');
  
  log('\n📋 Next steps:', 'yellow');
  log(`  1. cd ${path.relative('.', destPath) || projectName}`, 'reset');
  
  if (templateType === 'backend-node') {
    log('  2. npm install', 'reset');
    log('  3. Update .env with your configuration', 'reset');
    log('  4. npm run prisma:generate', 'reset');
    log('  5. npm run migrate:up', 'reset');
    log('  6. npm run dev', 'reset');
  } else if (templateType === 'backend-python') {
    log('  2. python -m venv venv', 'reset');
    log('  3. source venv/bin/activate  # or venv\\Scripts\\activate on Windows', 'reset');
    log('  4. pip install -r requirements.txt', 'reset');
    log('  5. Update .env with your configuration', 'reset');
    log('  6. python -m uvicorn app.main:app --reload', 'reset');
  } else if (templateType === 'frontend') {
    log('  2. npm install', 'reset');
    log('  3. Update env/.dev.env and public/config.js', 'reset');
    log('  4. npm run start:dev', 'reset');
  }

  log('\n📚 Documentation:', 'yellow');
  log('  - See TEMPLATE_README.md in project folder', 'reset');
  log('  - See standards/07-approved-templates.md for full details', 'reset');
  log('\n');
}

main();

