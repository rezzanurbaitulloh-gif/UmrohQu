#!/usr/bin/env ts-node

import { createClient } from '../src/lib/supabase/client';
import { createAdminAccount } from '../src/lib/supabase/auth';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('=== Create Admin Account ===');

  const fullName = await prompt('Masukkan nama lengkap admin: ');
  const email = await prompt('Masukkan email admin: ');
  const password = await prompt('Masukkan password admin (minimal 8 karakter): ');

  if (password.length < 8) {
    console.error('Error: Password harus minimal 8 karakter');
    rl.close();
    process.exit(1);
  }

  try {
    const supabase = createClient();

    console.log('\nMembuat akun admin...');
    const user = await createAdminAccount(email, password, fullName);

    console.log('\n✅ Akun admin berhasil dibuat!');
    console.log(`ID Pengguna: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Nama Lengkap: ${fullName}`);
    console.log('\nAnda dapat login ke halaman admin menggunakan email dan password ini.');

    // Update .env.local file
    const envPath = '.env.local';
    const fs = require('fs');
    let envContent = '';

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Update or add admin credentials
    const adminEmailRegex = /^NEXT_PUBLIC_ADMIN_EMAIL=/m;
    const adminPasswordRegex = /^NEXT_PUBLIC_ADMIN_PASSWORD=/m;

    if (adminEmailRegex.test(envContent)) {
      envContent = envContent.replace(/^NEXT_PUBLIC_ADMIN_EMAIL=.*$/m, `NEXT_PUBLIC_ADMIN_EMAIL=${email}`);
    } else {
      envContent += `\nNEXT_PUBLIC_ADMIN_EMAIL=${email}`;
    }

    if (adminPasswordRegex.test(envContent)) {
      envContent = envContent.replace(/^NEXT_PUBLIC_ADMIN_PASSWORD=.*$/m, `NEXT_PUBLIC_ADMIN_PASSWORD=${password}`);
    } else {
      envContent += `\nNEXT_PUBLIC_ADMIN_PASSWORD=${password}`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log(`\n✅ File .env.local telah diperbarui dengan kredensial admin.`);

  } catch (error) {
    console.error('\n❌ Gagal membuat akun admin:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();