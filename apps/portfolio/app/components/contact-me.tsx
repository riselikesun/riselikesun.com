"use client";

import {  CalendarDays, Mail, Linkedin, Github } from "@riselikesun/ui/icons"
import { CardContent, CardHeader, CardTitle, Button, Card, MetricCard, Link } from "@riselikesun/ui";
import config from "@/app/config";
import { motion, Variants } from "motion/react";
import { Container } from "@/components/shared/container";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

function cleanUrlString(url: string) {
    return String(url).split("//").pop()?.split("www.").pop() || '';
}

const contactMethods = [
    {
        label: "Email",
        value: config.email,
        href: `mailto:${config.email}`,
        icon: Mail,
        accent: "text-sky-300",
        copyLink: config.email,
    },
    {
        label: "GitHub",
        value: cleanUrlString(config.github),
        copyLink: config.github,
        href: config.github,
        icon: Github,
        accent: "text-emerald-300",
    },
    {
        label: "LinkedIn",
        value: cleanUrlString(config.linkedin),
        copyLink: config.linkedin,
        href: config.linkedin,
        icon: Linkedin,
        accent: "text-blue-300",
    },
];

export default function ContactMe() {
    return (
        <Container id="contact" background="navy">
            <div className="flex flex-col gap-8 md:gap-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
                >
                    <motion.div variants={itemVariants}>
                        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary">
                            Let&apos;s build something meaningful
                        </p>
                        <h2 className="max-w-xl text-4xl font-semibold tracking-tight leading-snug md:text-6xl">
                            Contact me.
                        </h2>
                        <p className=" max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                            I&apos;m available for product engineering, thoughtful product design partnerships, and opportunities where strong execution matters.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                        <Button asChild size="lg">
                            <a href={config.calendarURL} target="_blank" rel="noreferrer noopener" title="Book a coffee chat" className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                Book a coffee chat
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-5 md:grid-cols-3"
                >
                    {contactMethods.map(({ label, value, href, icon: Icon, accent, copyLink }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer noopener" title={label}>
                        <MetricCard
                            showExternalIcon
                            copyLink={copyLink}
                            icon={<Icon />}
                            label={label}
                            value={value}
                            accent={accent}
                        >
                            <motion.a variants={itemVariants} title={`Contact via ${label}`} />
                        </MetricCard>
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={itemVariants}
                >
                    <Card variant="image" className="border border-primary/20 bg-linear-to-br from-amber-300/8 via-slate-900 to-slate-900">
                        <CardHeader>
                            <CardTitle className="text-primary text-sm uppercase tracking-[0.24em]" >Response time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div>
                                    <p className="text-3xl font-semibold">24h</p>
                                    <p className="mt-2 text-muted-foreground">for general inquiries</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-semibold">2-3d</p>
                                    <p className="mt-2 text-muted-foreground">for project conversations</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-semibold">Weekly</p>
                                    <p className="mt-2 text-muted-foreground">for coffee chats and new ideas</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </Container>
    );
}
