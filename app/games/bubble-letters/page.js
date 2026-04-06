"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── ANIMAL SVG COMPONENTS ───────────────────────────────────────────────────

const CatSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="270" rx="80" ry="70" fill="#f4a460" stroke="#c8722a" strokeWidth="3"/>
    <circle cx="340" cy="175" r="70" fill="#f4a460" stroke="#c8722a" strokeWidth="3"/>
    <polygon points="285,130 268,88 308,118" fill="#f4a460" stroke="#c8722a" strokeWidth="3" strokeLinejoin="round"/>
    <polygon points="287,126 274,98 302,116" fill="#f5c0c0" stroke="none"/>
    <polygon points="395,130 412,88 372,118" fill="#f4a460" stroke="#c8722a" strokeWidth="3" strokeLinejoin="round"/>
    <polygon points="393,126 406,98 378,116" fill="#f5c0c0" stroke="none"/>
    <path d="M306 164 Q316 155 326 164" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M354 164 Q364 155 374 164" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <polygon points="340,183 334,190 346,190" fill="#e07080" stroke="none"/>
    <path d="M322 196 Q340 214 358 196" fill="none" stroke="#c8722a" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="304" cy="192" rx="14" ry="9" fill="#f5a0a0" opacity="0.55"/>
    <ellipse cx="376" cy="192" rx="14" ry="9" fill="#f5a0a0" opacity="0.55"/>
    <line x1="330" y1="188" x2="278" y2="182" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <line x1="330" y1="193" x2="276" y2="193" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <line x1="330" y1="198" x2="278" y2="204" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <line x1="350" y1="188" x2="402" y2="182" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <line x1="350" y1="193" x2="404" y2="193" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <line x1="350" y1="198" x2="402" y2="204" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round"/>
    <path d="M420 300 Q480 260 470 220 Q460 185 440 200" fill="none" stroke="#f4a460" strokeWidth="18" strokeLinecap="round"/>
    <path d="M420 300 Q480 260 470 220 Q460 185 440 200" fill="none" stroke="#c8722a" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="305" cy="328" rx="28" ry="18" fill="#f4a460" stroke="#c8722a" strokeWidth="2.5"/>
    <ellipse cx="375" cy="328" rx="28" ry="18" fill="#f4a460" stroke="#c8722a" strokeWidth="2.5"/>
    <ellipse cx="340" cy="265" rx="38" ry="44" fill="#fde8c8" opacity="0.7"/>
  </svg>
);

const DogSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="270" rx="80" ry="70" fill="#c8a876" stroke="#8b6914" strokeWidth="3"/>
    <circle cx="340" cy="175" r="70" fill="#c8a876" stroke="#8b6914" strokeWidth="3"/>
    <ellipse cx="285" cy="168" rx="22" ry="42" fill="#a07840" stroke="#8b6914" strokeWidth="2.5" transform="rotate(-15 285 168)"/>
    <ellipse cx="395" cy="168" rx="22" ry="42" fill="#a07840" stroke="#8b6914" strokeWidth="2.5" transform="rotate(15 395 168)"/>
    <path d="M306 164 Q316 155 326 164" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M354 164 Q364 155 374 164" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="340" cy="196" rx="24" ry="18" fill="#e8c890" stroke="#8b6914" strokeWidth="2"/>
    <ellipse cx="340" cy="186" rx="10" ry="7" fill="#2c1a0e"/>
    <path d="M322 200 Q340 216 358 200" fill="none" stroke="#8b6914" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="304" cy="196" rx="14" ry="9" fill="#f5a0a0" opacity="0.5"/>
    <ellipse cx="376" cy="196" rx="14" ry="9" fill="#f5a0a0" opacity="0.5"/>
    <path d="M418 285 Q470 240 455 200 Q445 175 425 188" fill="none" stroke="#c8a876" strokeWidth="18" strokeLinecap="round"/>
    <path d="M418 285 Q470 240 455 200 Q445 175 425 188" fill="none" stroke="#8b6914" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="305" cy="328" rx="28" ry="18" fill="#c8a876" stroke="#8b6914" strokeWidth="2.5"/>
    <ellipse cx="375" cy="328" rx="28" ry="18" fill="#c8a876" stroke="#8b6914" strokeWidth="2.5"/>
    <ellipse cx="340" cy="265" rx="38" ry="44" fill="#e8d8b0" opacity="0.6"/>
  </svg>
);

const HenSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="278" rx="85" ry="75" fill="#e84040" stroke="#a02020" strokeWidth="3"/>
    <ellipse cx="295" cy="278" rx="30" ry="50" fill="#c83030" stroke="#a02020" strokeWidth="2" transform="rotate(-10 295 278)"/>
    <ellipse cx="385" cy="278" rx="30" ry="50" fill="#c83030" stroke="#a02020" strokeWidth="2" transform="rotate(10 385 278)"/>
    <circle cx="340" cy="170" r="58" fill="#e84040" stroke="#a02020" strokeWidth="3"/>
    <ellipse cx="320" cy="120" rx="12" ry="18" fill="#ff6060" stroke="#a02020" strokeWidth="2"/>
    <ellipse cx="340" cy="112" rx="12" ry="22" fill="#ff6060" stroke="#a02020" strokeWidth="2"/>
    <ellipse cx="360" cy="120" rx="12" ry="18" fill="#ff6060" stroke="#a02020" strokeWidth="2"/>
    <ellipse cx="340" cy="210" rx="12" ry="16" fill="#ff6060" stroke="#a02020" strokeWidth="2"/>
    <polygon points="340,185 325,196 355,196" fill="#f0c030" stroke="#c09010" strokeWidth="2"/>
    <path d="M308 158 Q318 149 328 158" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 158 Q362 149 372 158" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M322 200 Q340 214 358 200" fill="none" stroke="#a02020" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="298" cy="178" rx="13" ry="8" fill="#ffaaaa" opacity="0.5"/>
    <ellipse cx="382" cy="178" rx="13" ry="8" fill="#ffaaaa" opacity="0.5"/>
    <line x1="310" y1="348" x2="290" y2="375" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="310" y1="348" x2="305" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="310" y1="348" x2="320" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="370" y1="348" x2="350" y2="375" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="370" y1="348" x2="365" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="370" y1="348" x2="380" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const PigSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="275" rx="88" ry="75" fill="#f4a0b4" stroke="#d06080" strokeWidth="3"/>
    <circle cx="340" cy="172" r="72" fill="#f4a0b4" stroke="#d06080" strokeWidth="3"/>
    <ellipse cx="292" cy="130" rx="22" ry="28" fill="#f090a8" stroke="#d06080" strokeWidth="2.5" transform="rotate(-20 292 130)"/>
    <ellipse cx="388" cy="130" rx="22" ry="28" fill="#f090a8" stroke="#d06080" strokeWidth="2.5" transform="rotate(20 388 130)"/>
    <ellipse cx="292" cy="128" rx="14" ry="20" fill="#f5c0cc" transform="rotate(-20 292 128)"/>
    <ellipse cx="388" cy="128" rx="14" ry="20" fill="#f5c0cc" transform="rotate(20 388 128)"/>
    <path d="M308 160 Q318 151 328 160" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 160 Q362 151 372 160" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="340" cy="196" rx="28" ry="22" fill="#f090a8" stroke="#d06080" strokeWidth="2.5"/>
    <ellipse cx="330" cy="196" rx="6" ry="5" fill="#c05070"/>
    <ellipse cx="350" cy="196" rx="6" ry="5" fill="#c05070"/>
    <path d="M320 206 Q340 222 360 206" fill="none" stroke="#d06080" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="302" cy="190" rx="15" ry="10" fill="#f5a0a0" opacity="0.6"/>
    <ellipse cx="378" cy="190" rx="15" ry="10" fill="#f5a0a0" opacity="0.6"/>
    <path d="M428 270 Q455 250 448 230 Q441 210 428 220 Q415 230 422 245" fill="none" stroke="#f4a0b4" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="300" cy="335" rx="26" ry="20" fill="#f4a0b4" stroke="#d06080" strokeWidth="2.5"/>
    <ellipse cx="380" cy="335" rx="26" ry="20" fill="#f4a0b4" stroke="#d06080" strokeWidth="2.5"/>
    <ellipse cx="300" cy="348" rx="22" ry="12" fill="#d06080" stroke="#a04060" strokeWidth="2"/>
    <ellipse cx="380" cy="348" rx="22" ry="12" fill="#d06080" stroke="#a04060" strokeWidth="2"/>
    <ellipse cx="340" cy="270" rx="45" ry="50" fill="#f5c0cc" opacity="0.5"/>
  </svg>
);

const OwlSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="275" rx="80" ry="82" fill="#a07840" stroke="#6b4e14" strokeWidth="3"/>
    <ellipse cx="268" cy="285" rx="28" ry="58" fill="#8b6420" stroke="#6b4e14" strokeWidth="2.5" transform="rotate(-8 268 285)"/>
    <ellipse cx="412" cy="285" rx="28" ry="58" fill="#8b6420" stroke="#6b4e14" strokeWidth="2.5" transform="rotate(8 412 285)"/>
    <circle cx="340" cy="172" r="72" fill="#a07840" stroke="#6b4e14" strokeWidth="3"/>
    <polygon points="310,112 298,78 322,105" fill="#a07840" stroke="#6b4e14" strokeWidth="2.5" strokeLinejoin="round"/>
    <polygon points="370,112 382,78 358,105" fill="#a07840" stroke="#6b4e14" strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="316" cy="170" r="26" fill="#f0e8d0" stroke="#6b4e14" strokeWidth="3"/>
    <circle cx="364" cy="170" r="26" fill="#f0e8d0" stroke="#6b4e14" strokeWidth="3"/>
    <circle cx="316" cy="170" r="15" fill="#2c1a0e"/>
    <circle cx="364" cy="170" r="15" fill="#2c1a0e"/>
    <circle cx="320" cy="166" r="5" fill="white"/>
    <circle cx="368" cy="166" r="5" fill="white"/>
    <polygon points="340,188 328,202 352,202" fill="#f0c030" stroke="#c09010" strokeWidth="2"/>
    <path d="M326 202 Q340 214 354 202" fill="none" stroke="#6b4e14" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="298" cy="188" rx="13" ry="8" fill="#f5a0a0" opacity="0.45"/>
    <ellipse cx="382" cy="188" rx="13" ry="8" fill="#f5a0a0" opacity="0.45"/>
    <ellipse cx="340" cy="272" rx="42" ry="55" fill="#c8a860" opacity="0.45"/>
    <line x1="315" y1="352" x2="295" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="315" y1="352" x2="310" y2="382" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="315" y1="352" x2="328" y2="380" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="365" y1="352" x2="345" y2="378" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="365" y1="352" x2="360" y2="382" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
    <line x1="365" y1="352" x2="378" y2="380" stroke="#f0c030" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const FoxSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="275" rx="82" ry="72" fill="#e86820" stroke="#b04010" strokeWidth="3"/>
    <circle cx="340" cy="172" r="70" fill="#e86820" stroke="#b04010" strokeWidth="3"/>
    <polygon points="300,128 282,82 318,118" fill="#e86820" stroke="#b04010" strokeWidth="2.5" strokeLinejoin="round"/>
    <polygon points="380,128 398,82 362,118" fill="#e86820" stroke="#b04010" strokeWidth="2.5" strokeLinejoin="round"/>
    <polygon points="300,124 286,94 312,116" fill="#f5c0b0"/>
    <polygon points="380,124 394,94 368,116" fill="#f5c0b0"/>
    <ellipse cx="340" cy="190" rx="38" ry="32" fill="#f5e8d8"/>
    <path d="M308 160 Q318 151 328 160" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 160 Q362 151 372 160" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="340" cy="183" rx="8" ry="6" fill="#2c1a0e"/>
    <path d="M322 194 Q340 210 358 194" fill="none" stroke="#b04010" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="302" cy="188" rx="14" ry="9" fill="#f5a070" opacity="0.5"/>
    <ellipse cx="378" cy="188" rx="14" ry="9" fill="#f5a070" opacity="0.5"/>
    <ellipse cx="435" cy="295" rx="35" ry="55" fill="#e86820" stroke="#b04010" strokeWidth="2.5" transform="rotate(20 435 295)"/>
    <ellipse cx="440" cy="288" rx="18" ry="30" fill="#f5e8d8" transform="rotate(20 440 288)"/>
    <ellipse cx="305" cy="330" rx="27" ry="18" fill="#e86820" stroke="#b04010" strokeWidth="2.5"/>
    <ellipse cx="375" cy="330" rx="27" ry="18" fill="#e86820" stroke="#b04010" strokeWidth="2.5"/>
    <ellipse cx="340" cy="270" rx="40" ry="46" fill="#f5e8d8" opacity="0.55"/>
  </svg>
);

const RatSVG = () => (
  <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="278" rx="82" ry="72" fill="#b8a0b8" stroke="#806090" strokeWidth="3"/>
    <circle cx="340" cy="172" r="68" fill="#b8a0b8" stroke="#806090" strokeWidth="3"/>
    <circle cx="292" cy="130" r="30" fill="#b8a0b8" stroke="#806090" strokeWidth="2.5"/>
    <circle cx="388" cy="130" r="30" fill="#b8a0b8" stroke="#806090" strokeWidth="2.5"/>
    <circle cx="292" cy="130" r="20" fill="#f0c0d0"/>
    <circle cx="388" cy="130" r="20" fill="#f0c0d0"/>
    <path d="M308 162 Q318 153 328 162" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 162 Q362 153 372 162" fill="none" stroke="#2c1a0e" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="340" cy="200" rx="20" ry="15" fill="#c8a8c8" stroke="#806090" strokeWidth="2"/>
    <ellipse cx="340" cy="192" rx="7" ry="5" fill="#d06080"/>
    <path d="M324 204 Q340 218 356 204" fill="none" stroke="#806090" strokeWidth="3" strokeLinecap="round"/>
    <line x1="330" y1="197" x2="282" y2="191" stroke="#806090" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="330" y1="201" x2="280" y2="201" stroke="#806090" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="350" y1="197" x2="398" y2="191" stroke="#806090" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="350" y1="201" x2="400" y2="201" stroke="#806090" strokeWidth="1.8" strokeLinecap="round"/>
    <ellipse cx="304" cy="194" rx="13" ry="8" fill="#f5a0b0" opacity="0.5"/>
    <ellipse cx="376" cy="194" rx="13" ry="8" fill="#f5a0b0" opacity="0.5"/>
    <path d="M422 295 Q480 268 490 235 Q498 208 478 200 Q462 194 458 212" fill="none" stroke="#b8a0b8" strokeWidth="10" strokeLinecap="round"/>
    <ellipse cx="305" cy="332" rx="26" ry="17" fill="#b8a0b8" stroke="#806090" strokeWidth="2.5"/>
    <ellipse cx="375" cy="332" rx="26" ry="17" fill="#b8a0b8" stroke="#806090" strokeWidth="2.5"/>
    <ellipse cx="340" cy="274" rx="40" ry="48" fill="#d0c0d8" opacity="0.5"/>
  </svg>
);

const BatSVG = () => (
  <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M270 240 Q200 180 160 200 Q140 220 170 250 Q210 270 270 265" fill="#6040a0" stroke="#402080" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M410 240 Q480 180 520 200 Q540 220 510 250 Q470 270 410 265" fill="#6040a0" stroke="#402080" strokeWidth="2.5" strokeLinejoin="round"/>
    <ellipse cx="340" cy="268" rx="70" ry="65" fill="#6040a0" stroke="#402080" strokeWidth="3"/>
    <circle cx="340" cy="172" r="65" fill="#6040a0" stroke="#402080" strokeWidth="3"/>
    <polygon points="302,125 286,82 318,115" fill="#6040a0" stroke="#402080" strokeWidth="2.5" strokeLinejoin="round"/>
    <polygon points="378,125 394,82 362,115" fill="#6040a0" stroke="#402080" strokeWidth="2.5" strokeLinejoin="round"/>
    <polygon points="302,122 290,92 314,114" fill="#c090e0"/>
    <polygon points="378,122 390,92 366,114" fill="#c090e0"/>
    <path d="M308 162 Q318 153 328 162" fill="none" stroke="#f0e0ff" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 162 Q362 153 372 162" fill="none" stroke="#f0e0ff" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="340" cy="182" rx="8" ry="6" fill="#402080"/>
    <path d="M322 194 Q340 210 358 194" fill="none" stroke="#c090e0" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="302" cy="186" rx="13" ry="8" fill="#c090e0" opacity="0.4"/>
    <ellipse cx="378" cy="186" rx="13" ry="8" fill="#c090e0" opacity="0.4"/>
    <ellipse cx="340" cy="265" rx="38" ry="44" fill="#9070c0" opacity="0.4"/>
  </svg>
);

const AntSVG = () => (
  <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="340" cy="320" rx="55" ry="62" fill="#c03020" stroke="#801810" strokeWidth="3"/>
    <ellipse cx="340" cy="230" rx="40" ry="38" fill="#c03020" stroke="#801810" strokeWidth="3"/>
    <circle cx="340" cy="162" r="52" fill="#c03020" stroke="#801810" strokeWidth="3"/>
    <path d="M318 118 Q300 88 282 75" fill="none" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="282" cy="75" r="7" fill="#c03020" stroke="#801810" strokeWidth="2.5"/>
    <path d="M362 118 Q380 88 398 75" fill="none" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="398" cy="75" r="7" fill="#c03020" stroke="#801810" strokeWidth="2.5"/>
    <path d="M312 158 Q322 149 332 158" fill="none" stroke="#f0e0d0" strokeWidth="4" strokeLinecap="round"/>
    <path d="M348 158 Q358 149 368 158" fill="none" stroke="#f0e0d0" strokeWidth="4" strokeLinecap="round"/>
    <path d="M322 174 Q340 188 358 174" fill="none" stroke="#f0c0a0" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="302" cy="170" rx="12" ry="8" fill="#f5a0a0" opacity="0.45"/>
    <ellipse cx="378" cy="170" rx="12" ry="8" fill="#f5a0a0" opacity="0.45"/>
    <line x1="305" y1="220" x2="255" y2="200" stroke="#801810" strokeWidth="4" strokeLinecap="round"/>
    <line x1="255" y1="200" x2="228" y2="228" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="305" y1="232" x2="248" y2="232" stroke="#801810" strokeWidth="4" strokeLinecap="round"/>
    <line x1="248" y1="232" x2="222" y2="255" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="375" y1="220" x2="425" y2="200" stroke="#801810" strokeWidth="4" strokeLinecap="round"/>
    <line x1="425" y1="200" x2="452" y2="228" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="375" y1="232" x2="432" y2="232" stroke="#801810" strokeWidth="4" strokeLinecap="round"/>
    <line x1="432" y1="232" x2="458" y2="255" stroke="#801810" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

const BugSVG = () => (
  <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="290" cy="215" rx="55" ry="35" fill="#c0e0ff" stroke="#6090c0" strokeWidth="2" opacity="0.7" transform="rotate(-20 290 215)"/>
    <ellipse cx="390" cy="215" rx="55" ry="35" fill="#c0e0ff" stroke="#6090c0" strokeWidth="2" opacity="0.7" transform="rotate(20 390 215)"/>
    <ellipse cx="340" cy="295" rx="58" ry="65" fill="#e02020" stroke="#901010" strokeWidth="3"/>
    <circle cx="318" cy="278" r="10" fill="#901010"/>
    <circle cx="362" cy="278" r="10" fill="#901010"/>
    <circle cx="318" cy="308" r="10" fill="#901010"/>
    <circle cx="362" cy="308" r="10" fill="#901010"/>
    <circle cx="340" cy="330" r="9" fill="#901010"/>
    <line x1="340" y1="232" x2="340" y2="358" stroke="#901010" strokeWidth="3"/>
    <circle cx="340" cy="172" r="58" fill="#2c1a0e" stroke="#1a0a04" strokeWidth="3"/>
    <path d="M308 164 Q318 155 328 164" fill="none" stroke="#f0e0a0" strokeWidth="4" strokeLinecap="round"/>
    <path d="M352 164 Q362 155 372 164" fill="none" stroke="#f0e0a0" strokeWidth="4" strokeLinecap="round"/>
    <path d="M320 180 Q340 196 360 180" fill="none" stroke="#f0c060" strokeWidth="3" strokeLinecap="round"/>
    <path d="M320 122 Q306 95 295 82" fill="none" stroke="#1a0a04" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="295" cy="82" r="6" fill="#2c1a0e" stroke="#1a0a04" strokeWidth="2"/>
    <path d="M360 122 Q374 95 385 82" fill="none" stroke="#1a0a04" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="385" cy="82" r="6" fill="#2c1a0e" stroke="#1a0a04" strokeWidth="2"/>
    <line x1="295" y1="280" x2="250" y2="265" stroke="#901010" strokeWidth="4" strokeLinecap="round"/>
    <line x1="295" y1="295" x2="248" y2="295" stroke="#901010" strokeWidth="4" strokeLinecap="round"/>
    <line x1="385" y1="280" x2="430" y2="265" stroke="#901010" strokeWidth="4" strokeLinecap="round"/>
    <line x1="385" y1="295" x2="432" y2="295" stroke="#901010" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

// ─── DONNA SVG ────────────────────────────────────────────────────────────────
const DonnaSVG = ({ happy }) => (
  <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="dg" cx="42%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#fde87a"/>
        <stop offset="35%" stopColor="#f9c13a"/>
        <stop offset="70%" stopColor="#f0920e"/>
        <stop offset="100%" stopColor="#d4720a"/>
      </radialGradient>
      <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f07040" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#f07040" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <path d="M110 12 C116 30 120 48 126 60 C140 56 158 50 174 60 C180 66 170 80 160 90 C168 100 178 114 172 128 C166 140 150 134 138 128 C134 144 128 164 118 172 C108 178 102 160 110 146 C98 160 92 178 82 172 C72 166 66 146 62 128 C50 134 34 140 28 128 C22 114 32 100 40 90 C30 80 20 66 26 60 C42 50 60 56 74 60 C80 48 104 30 110 12Z"
      fill="url(#dg)" stroke="#c86808" strokeWidth="2.5"/>
    <ellipse cx="88" cy="112" rx="12" ry="8" fill="url(#bg2)"/>
    <ellipse cx="132" cy="112" rx="12" ry="8" fill="url(#bg2)"/>
    {happy ? (
      <>
        <path d="M88 94 Q96 84 104 94" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M116 94 Q124 84 132 94" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M96 108 Q110 124 124 108" fill="none" stroke="#3a2010" strokeWidth="3" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M91 96 Q99 88 107 96" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M113 96 Q121 88 129 96" fill="none" stroke="#3a2010" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M100 110 Q110 120 120 110" fill="none" stroke="#3a2010" strokeWidth="2.8" strokeLinecap="round"/>
      </>
    )}
  </svg>
);

// ─── GAME DATA ────────────────────────────────────────────────────────────────
const WORDS = [
  { word: "CAT", animal: "Cat",  Component: CatSVG  },
  { word: "DOG", animal: "Dog",  Component: DogSVG  },
  { word: "HEN", animal: "Hen",  Component: HenSVG  },
  { word: "PIG", animal: "Pig",  Component: PigSVG  },
  { word: "OWL", animal: "Owl",  Component: OwlSVG  },
  { word: "FOX", animal: "Fox",  Component: FoxSVG  },
  { word: "RAT", animal: "Rat",  Component: RatSVG  },
  { word: "BAT", animal: "Bat",  Component: BatSVG  },
  { word: "ANT", animal: "Ant",  Component: AntSVG  },
  { word: "BUG", animal: "Bug",  Component: BugSVG  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// shuffle helper
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// pick N wrong letters not in the word
function getWrongLetters(word, count) {
  const wordSet = new Set(word.split(""));
  const pool = ALPHABET.split("").filter(l => !wordSet.has(l));
  return shuffle(pool).slice(0, count);
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BubbleLetters() {
  const TOTAL_QUESTIONS = 5;

  const [questions]       = useState(() => shuffle(WORDS).slice(0, TOTAL_QUESTIONS));
  const [qIndex, setQIndex]       = useState(0);
  const [popped, setPopped]       = useState([]);       // letters popped so far
  const [bubbles, setBubbles]     = useState([]);       // all bubbles for this word
  const [feedback, setFeedback]   = useState(null);     // "correct" | "wrong" | null
  const [shells, setShells]       = useState(0);
  const [gameOver, setGameOver]   = useState(false);
  const [donnaHappy, setDonnaHappy] = useState(false);

  const current = questions[qIndex];

  // Build bubbles whenever question changes
  useEffect(() => {
    if (!current) return;
    const { word } = current;
    const letters = word.split("");
    const wrong   = getWrongLetters(word, 6); // 6 distractor letters
    const all     = shuffle([...letters, ...wrong]);
    // assign random positions within the play area
    const positioned = all.map((letter, i) => ({
      id: i,
      letter,
      x: 8 + (i % 5) * 18,   // % across width in rem-ish units — we use inline style %
      y: 15 + Math.floor(i / 5) * 22,
      isCorrect: letters.includes(letter),
      popped: false,
    }));
    setBubbles(positioned);
    setPopped([]);
    setFeedback(null);
    setDonnaHappy(false);
  }, [qIndex, current]);

  function handlePop(bubble) {
    if (feedback) return; // locked while showing feedback
    if (popped.includes(bubble.id)) return; // already popped

    const { word } = current;
    const nextIndex = popped.length; // which letter we expect next
    const expectedLetter = word[nextIndex];

    if (bubble.letter === expectedLetter) {
      // Correct!
      const newPopped = [...popped, bubble.id];
      setPopped(newPopped);

      if (newPopped.length === word.length) {
        // Word complete!
        setShells(s => s + 1);
        setDonnaHappy(true);
        setFeedback("correct");
        setTimeout(() => {
          if (qIndex + 1 < TOTAL_QUESTIONS) {
            setQIndex(q => q + 1);
          } else {
            setGameOver(true);
          }
          setFeedback(null);
        }, 1800);
      }
    } else {
      // Wrong letter
      setFeedback("wrong");
      setDonnaHappy(false);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  // ── GAME OVER SCREEN ──
  if (gameOver) {
    return (
      <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center justify-center p-6 gap-8">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="w-40 h-40 animate-bounce">
          <DonnaSVG happy={true} />
        </div>
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Well Done!
          </h1>
          <p className="text-white/60 text-lg mb-2">You spelled all the words!</p>
          <p className="text-[#ff8c6b] font-black text-2xl">{shells} shells earned</p>
        </div>
        <div className="flex gap-4">
          <Link href="/map">
            <button className="px-8 py-4 bg-[#ff6b4a] text-white font-black text-lg rounded-2xl shadow-lg hover:bg-[#ff5a36] transition-all">
              Back to Map
            </button>
          </Link>
          <button
            onClick={() => { setQIndex(0); setShells(0); setGameOver(false); }}
            className="px-8 py-4 bg-white/10 text-white font-black text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  if (!current) return null;

  const { word, animal, Component } = current;

  return (
    <main className="relative min-h-screen w-full bg-[#0d2b5e] overflow-hidden flex flex-col items-center p-6">

      {/* Background glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* ── TOP BAR ── */}
      <nav className="w-full flex justify-between items-center z-20 mb-4">
        <Link href="/map">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Back
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
            {qIndex + 1} / {TOTAL_QUESTIONS}
          </span>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <span className="text-[#ff8c6b] font-black text-sm">{shells}</span>
            <span className="text-white/40 text-xs font-bold">shells</span>
          </div>
        </div>
      </nav>

      {/* ── PROGRESS BAR ── */}
      <div className="w-full max-w-xl h-1.5 bg-white/10 rounded-full mb-6 z-10">
        <div
          className="h-full bg-[#ff6b4a] rounded-full transition-all duration-500"
          style={{ width: `${((qIndex) / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>

      {/* ── MAIN GAME AREA ── */}
      <div className="w-full max-w-xl z-10 flex flex-col items-center gap-6">

        {/* Animal + Donna row */}
        <div className="w-full flex items-end justify-between gap-4">

          {/* Animal card */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-36 h-36 bg-white/5 border border-white/10 rounded-3xl p-2 flex items-center justify-center">
              <Component />
            </div>
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">{animal}</span>
          </div>

          {/* Donna */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-24 h-24 transition-transform duration-300 ${donnaHappy ? "scale-110" : "scale-100"}`}>
              <DonnaSVG happy={donnaHappy} />
            </div>
            {feedback === "correct" && (
              <span className="text-[#ff8c6b] text-xs font-black animate-bounce">Amazing!</span>
            )}
            {feedback === "wrong" && (
              <span className="text-white/50 text-xs font-black">Try again!</span>
            )}
          </div>
        </div>

        {/* Word progress — show popped letters */}
        <div className="flex gap-3">
          {word.split("").map((letter, i) => {
            const isPoppedNow = popped.length > i;
            return (
              <div
                key={i}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all duration-300 ${
                  isPoppedNow
                    ? "bg-[#ff6b4a] border-[#ff6b4a] text-white scale-110"
                    : "bg-white/5 border-white/20 text-white/20"
                }`}
              >
                {isPoppedNow ? letter : "_"}
              </div>
            );
          })}
        </div>

        {/* Instruction */}
        <p className="text-white/40 text-sm font-bold">
          Pop the letters in order to spell <span className="text-white/70">{word}</span>
        </p>

        {/* ── BUBBLES ── */}
        <div className="relative w-full h-72 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
          {bubbles.map((bubble) => {
            const isPopped = popped.includes(bubble.id);
            const isNext   = !isPopped && bubble.letter === word[popped.length];
            return (
              <button
                key={bubble.id}
                onClick={() => handlePop(bubble)}
                disabled={isPopped}
                style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                className={`absolute w-14 h-14 rounded-full border-2 font-black text-lg transition-all duration-200 transform
                  ${isPopped
                    ? "opacity-0 scale-0 pointer-events-none"
                    : isNext
                    ? "bg-[#ff6b4a]/20 border-[#ff8c6b] text-[#ff8c6b] scale-110 shadow-lg shadow-[#ff6b4a]/20 hover:scale-125 hover:bg-[#ff6b4a]/30"
                    : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:scale-110"
                  }`}
              >
                {bubble.letter}
              </button>
            );
          })}

          {/* Wrong feedback flash */}
          {feedback === "wrong" && (
            <div className="absolute inset-0 bg-red-500/10 rounded-3xl pointer-events-none animate-pulse" />
          )}
        </div>

      </div>
    </main>
  );
}