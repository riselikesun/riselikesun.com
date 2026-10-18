import { Experience } from '../../types/types'
import { ProjectDialog } from './project-dialog'
import { TechStackDialog } from './tech-stack-dialog'
import { ExperienceDialog } from './experience-dialog'
import { TechPill } from './tech-pill'
import { motion, Variants } from 'motion/react'
import { Card, CardContent, CardFooter, Badge, Link, List, ListItem } from '@riselikesun/ui'

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface ExperienceCardProps {
  exp: Experience
  isFeatured?: boolean
}

export default function ExperienceCard({ exp, isFeatured = false }: ExperienceCardProps) {
  // Combine top-level responsibilities and achievements to show on the card
  const highlights = [
    ...(exp.responsibilities || []),
    ...(exp.achievements || []),
    // If no top-level responsibilities, grab the first few from projects
    ...(exp.responsibilities?.length || exp.achievements?.length ? [] :
      (exp.projects?.flatMap(p => p.responsibilities || []).slice(0, 3) || []))
  ];

  // Combine tech from top-level and projects, removing duplicates
  const allTech = [
    ...(exp.tech || []),
    ...(exp.projects?.flatMap(p => p.tech || []) || [])
  ];
  const uniqueTech = Array.from(new Map(allTech.map(t => [t.name, t])).values());

  // Limit visible tech tags for a cleaner bento look, show all if featured
  const maxTech = isFeatured ? 15 : 8;
  const visibleTech = uniqueTech.slice(0, maxTech);
  const hasMoreTech = uniqueTech.length > maxTech;

  return (
    <Card
      variant={isFeatured ? "featured" : "blurred"}
      className="h-full"
    >
      <CardContent className={isFeatured ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "flex flex-col"}>
        {/* Left Column (or full width if not featured) */}
        <div className="flex flex-col">
          <motion.header variants={textVariants} className="mb-5 flex flex-col gap-1">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <h3 className={`font-bold tracking-tight ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                {exp.role}
              </h3>
              {isFeatured && (
                <Badge variant="highlighted" className="mb-3">
                  Featured Role
                </Badge>
              )}
            </div>

            <div className="mt-1 flex items-center flex-wrap gap-2 text-base">
              {exp.company.website ? (
                <Link
                  href={exp.company.website}
                  title={`Visit ${exp.company.name} website`}
                  variant="highlighted"
                  showExternalIcon="hover"
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {exp.company.name}
                </Link>
              ) : (
                <span className="text-primary font-semibold">{exp.company.name}</span>
              )}
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{exp.location ?? exp.company.location ?? 'Remote'}</span>
            </div>
            <p className="text-sm text-muted-foreground/60 font-mono mt-1">{exp.period}</p>
          </motion.header>

          <motion.div variants={textVariants} className="grow">
            {highlights.length > 0 && (
              <List color="secondary">
                {highlights.map((r, i) => (
                  <ListItem key={i}>{r}</ListItem>
                ))}
              </List>
            )}

            {/* Show Projects for non-featured cards */}
            {!isFeatured && exp.projects && exp.projects.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-3 uppercase">Key Projects</p>
                <div className="flex flex-col gap-3">
                  {exp.projects.slice(0, 2).map((proj, i) => (
                    <ProjectDialog key={i} project={proj} isFeatured={false} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column (only if featured) */}
        {isFeatured && (
          <motion.div variants={textVariants} className="flex flex-col">
            {exp.projects && exp.projects.length > 0 && (
              <div className="grow">
                <p className="text-sm font-semibold tracking-wider text-muted-foreground mb-3 uppercase">Key Projects</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {exp.projects.slice(0, 4).map((proj, i) => (
                    <ProjectDialog key={i} project={proj} companyTech={exp.tech} isFeatured={true} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>

      {/* Tech Stack spans full width at the bottom */}
      <CardFooter className="flex-col sm:flex-row sm:items-center justify-between">
        <motion.div variants={textVariants} className="pt-8 border-t border-border/40 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {visibleTech.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center grow">
              {visibleTech.map((tech, i) => (
                <TechPill key={i} tech={tech} />
              ))}
              {hasMoreTech && (
                <TechStackDialog tech={uniqueTech} hiddenCount={uniqueTech.length - maxTech} />
              )}
            </div>
          )}

          <div className="shrink-0 self-start sm:self-auto">
            <ExperienceDialog exp={exp} />
          </div>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
