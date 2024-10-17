'use client';

import copy from '../copy.json';
import Button from './Button';

export default function Header() {
  return (
    <header className="relative h-screen bg-orange-500 flex items-center justify-center">
      <div className="relative z-10 w-full max-w-6xl px-6 py-20 text-center">
        <h1 className="text-7xl font-extrabold text-white mb-7">
          {copy.hero.title}
        </h1>
        <p className="text-3xl text-white mb-10">
          {copy.hero.description}
        </p>
        <Button variant="hero" text={copy.hero.button} href="#consultoria-form" />
      </div>
    </header>
  );
}
