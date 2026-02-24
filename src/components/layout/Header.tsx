"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown, MessageSquare } from "lucide-react";
import { NAV_LINKS, PRIMARY_SERVICES, CITY_DATA, SITE } from "@/lib/constants";
import { CTAButton } from "@/components/shared/CTAButton";

const FEATURED_CITIES = CITY_DATA.filter((c) =>
  ["annapolis", "severna-park", "arnold", "crofton", "millersville", "glen-burnie", "odenton", "pasadena"].includes(c.slug)
);

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-22 sm:h-24 md:h-26 lg:h-28 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Backyard Bobby's Logo"
                width={300}
                height={112}
                className="h-20 md:h-22 lg:h-24 w-auto"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.label === "Services" ? (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand transition-colors rounded-md"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-2xl border border-border/50 py-2 min-w-[280px]">
                        {PRIMARY_SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-brand hover:bg-warm-bg transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : link.label === "Areas" ? (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand transition-colors rounded-md"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-xl shadow-2xl border border-border/50 py-3 min-w-[220px]">
                        <p className="px-4 pb-2 text-xs font-bold text-muted-foreground uppercase tracking-wide">
                          Popular Areas
                        </p>
                        {FEATURED_CITIES.map((city) => (
                          <Link
                            key={city.slug}
                            href={`/areas/${city.slug}`}
                            className="block px-4 py-2 text-sm text-foreground/70 hover:text-brand hover:bg-warm-bg transition-colors"
                          >
                            {city.name}, MD
                          </Link>
                        ))}
                        <div className="mx-4 mt-2 pt-2 border-t border-border/30">
                          <Link
                            href="/areas"
                            className="text-xs font-semibold text-brand hover:underline"
                          >
                            View all 19 service areas →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand transition-colors rounded-md"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={SITE.phoneSms}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-brand transition-colors"
                title="Text us"
              >
                <MessageSquare className="h-4 w-4" />
                Text
              </a>
              <a
                href={SITE.phoneTel}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition-colors"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <CTAButton href="/contact" size="default">
                Free Estimate
              </CTAButton>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-sm"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-22 sm:top-24 md:top-26 z-[60] bg-white overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.label === "Services" ? (
                <div key={link.label}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between w-full px-3 py-3.5 text-base font-medium rounded-lg hover:bg-muted min-h-[48px]"
                  >
                    Services
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3 text-sm font-medium text-brand rounded-lg hover:bg-muted min-h-[44px] flex items-center"
                      >
                        All Services
                      </Link>
                      {PRIMARY_SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-3 text-sm text-foreground/70 rounded-lg hover:bg-muted min-h-[44px] flex items-center"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === "Areas" ? (
                <div key={link.label}>
                  <button
                    onClick={() => setAreasOpen(!areasOpen)}
                    className="flex items-center justify-between w-full px-3 py-3.5 text-base font-medium rounded-lg hover:bg-muted min-h-[48px]"
                  >
                    Areas
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${areasOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {areasOpen && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      <Link
                        href="/areas"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3 text-sm font-medium text-brand rounded-lg hover:bg-muted min-h-[44px] flex items-center"
                      >
                        All Service Areas
                      </Link>
                      {FEATURED_CITIES.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/areas/${city.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-3 text-sm text-foreground/70 rounded-lg hover:bg-muted min-h-[44px] flex items-center"
                        >
                          {city.name}, MD
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3.5 text-base font-medium rounded-lg hover:bg-muted min-h-[48px]"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="px-4 pb-8 flex flex-col gap-3 safe-bottom">
            <CTAButton href="/contact" className="w-full min-h-[48px]">
              Get a Free Estimate
            </CTAButton>
            <a
              href={SITE.phoneTel}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors min-h-[48px]"
            >
              <Phone className="h-5 w-5" />
              Call {SITE.phone}
            </a>
            <a
              href={SITE.phoneSms}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg border border-border text-base font-semibold hover:bg-muted transition-colors min-h-[48px]"
            >
              <MessageSquare className="h-5 w-5" />
              Text Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
