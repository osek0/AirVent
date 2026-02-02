"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Hero ──────────────────────────────────────────────

export async function updateHeroContent(data: {
  tagline: string;
  heading: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  backgroundImage: string;
}) {
  await requireAuth();
  await prisma.heroContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidate();
}

// ─── About ─────────────────────────────────────────────

export async function updateAboutContent(data: {
  subtitle: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
}) {
  await requireAuth();
  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidate();
}

// ─── Why ───────────────────────────────────────────────

export async function updateWhyContent(data: {
  subtitle: string;
  heading: string;
  description: string;
}) {
  await requireAuth();
  await prisma.whyContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidate();
}

// ─── Contact Content ───────────────────────────────────

export async function updateContactContent(data: {
  subtitle: string;
  heading: string;
  description: string;
  formTitle: string;
}) {
  await requireAuth();
  await prisma.contactContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidate();
}

// ─── Section Headers ───────────────────────────────────

export async function updateSectionHeader(section: string, data: { subtitle: string; title: string }) {
  await requireAuth();
  await prisma.sectionHeader.upsert({
    where: { section },
    update: data,
    create: { section, ...data },
  });
  revalidate();
}

// ─── Site Settings ─────────────────────────────────────

export async function updateSiteSettings(data: { companyName: string }) {
  await requireAuth();
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidate();
}

// ─── Offer Items ───────────────────────────────────────

export async function createOfferItem(data: { icon: string; title: string; description: string; order: number }) {
  await requireAuth();
  await prisma.offerItem.create({ data });
  revalidate();
}

export async function updateOfferItem(id: string, data: { icon: string; title: string; description: string; order: number }) {
  await requireAuth();
  await prisma.offerItem.update({ where: { id }, data });
  revalidate();
}

export async function deleteOfferItem(id: string) {
  await requireAuth();
  await prisma.offerItem.delete({ where: { id } });
  revalidate();
}

// ─── About Stats ───────────────────────────────────────

export async function createAboutStat(data: { value: string; label: string; order: number }) {
  await requireAuth();
  await prisma.aboutStat.create({ data });
  revalidate();
}

export async function updateAboutStat(id: string, data: { value: string; label: string; order: number }) {
  await requireAuth();
  await prisma.aboutStat.update({ where: { id }, data });
  revalidate();
}

export async function deleteAboutStat(id: string) {
  await requireAuth();
  await prisma.aboutStat.delete({ where: { id } });
  revalidate();
}

// ─── Benefits ──────────────────────────────────────────

export async function createBenefit(data: { number: string; title: string; description: string; order: number }) {
  await requireAuth();
  await prisma.benefit.create({ data });
  revalidate();
}

export async function updateBenefit(id: string, data: { number: string; title: string; description: string; order: number }) {
  await requireAuth();
  await prisma.benefit.update({ where: { id }, data });
  revalidate();
}

export async function deleteBenefit(id: string) {
  await requireAuth();
  await prisma.benefit.delete({ where: { id } });
  revalidate();
}

// ─── Advantages ────────────────────────────────────────

export async function createAdvantage(data: { text: string; order: number }) {
  await requireAuth();
  await prisma.advantage.create({ data });
  revalidate();
}

export async function updateAdvantage(id: string, data: { text: string; order: number }) {
  await requireAuth();
  await prisma.advantage.update({ where: { id }, data });
  revalidate();
}

export async function deleteAdvantage(id: string) {
  await requireAuth();
  await prisma.advantage.delete({ where: { id } });
  revalidate();
}

// ─── Realizations ──────────────────────────────────────

export async function createRealization(data: { image: string; title: string; location: string; order: number }) {
  await requireAuth();
  await prisma.realization.create({ data });
  revalidate();
}

export async function updateRealization(id: string, data: { image: string; title: string; location: string; order: number }) {
  await requireAuth();
  await prisma.realization.update({ where: { id }, data });
  revalidate();
}

export async function deleteRealization(id: string) {
  await requireAuth();
  await prisma.realization.delete({ where: { id } });
  revalidate();
}

// ─── Testimonials ──────────────────────────────────────

export async function createTestimonial(data: { name: string; role: string; content: string; rating: number; order: number }) {
  await requireAuth();
  await prisma.testimonial.create({ data });
  revalidate();
}

export async function updateTestimonial(id: string, data: { name: string; role: string; content: string; rating: number; order: number }) {
  await requireAuth();
  await prisma.testimonial.update({ where: { id }, data });
  revalidate();
}

export async function deleteTestimonial(id: string) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidate();
}

// ─── Contact Info ──────────────────────────────────────

export async function createContactInfo(data: { icon: string; label: string; value: string; href: string; order: number }) {
  await requireAuth();
  await prisma.contactInfo.create({ data });
  revalidate();
}

export async function updateContactInfo(id: string, data: { icon: string; label: string; value: string; href: string; order: number }) {
  await requireAuth();
  await prisma.contactInfo.update({ where: { id }, data });
  revalidate();
}

export async function deleteContactInfo(id: string) {
  await requireAuth();
  await prisma.contactInfo.delete({ where: { id } });
  revalidate();
}

// ─── Image Upload ──────────────────────────────────────

export async function uploadImage(formData: FormData): Promise<string> {
  await requireAuth();
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const blob = await put(file.name, file, { access: "public" });
  return blob.url;
}

export async function deleteImage(url: string) {
  await requireAuth();
  try {
    await del(url);
  } catch {
    // Blob may not exist or may be a local image
  }
}
