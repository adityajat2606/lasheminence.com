import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { getDirectoryUiPreset } from '@/design/directory-ui'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const ui = getDirectoryUiPreset()
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }
  const stats = [category || taskLabel, location ? 'Mapped' : 'Directory', website ? 'Website' : 'Profile']

  return (
    <div className={`min-h-screen ${ui.shell}`}>
      <SchemaJsonLd data={schemaPayload} />
      <main className="pb-16">
        <section className={`${ui.detailHero}`}>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm font-semibold opacity-85 transition hover:opacity-100">
              <ArrowLeft className="h-4 w-4" />
              Back to {taskLabel}
            </Link>
          </div>
          <div className="relative -mt-4 h-[60vh] min-h-[400px] max-h-[700px] w-full overflow-hidden">
            <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
              <div className="space-y-4">
                <p className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90`}>
                  <ShieldCheck className="h-4 w-4" />
                  {ui.label}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{post.title}</h1>
                {location ? (
                  <p className="flex items-start gap-2 text-base leading-7 text-white/90">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    {location}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {stats.map((item) => (
                    <span key={item} className="border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 ? (
          <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Gallery</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.slice(1, 9).map((image) => (
                <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-all hover:shadow-md">
                  <ContentImage src={image} alt={`${post.title} additional photo`} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_400px] lg:px-8">
          <article className={`rounded-2xl p-8 sm:p-10 ${ui.detailPanel}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>About</p>
            <h2 className={`mt-4 text-3xl font-semibold ${ui.title}`}>Overview</h2>
            <RichContent html={descriptionHtml} className={`mt-6 max-w-3xl text-base leading-8 ${ui.muted}`} />
            {highlights.length ? (
              <div className="mt-10">
                <h3 className={`text-lg font-semibold ${ui.title}`}>Key Features</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div key={item} className={`flex items-start gap-3 rounded-lg px-5 py-4 text-base ${ui.chip}`}>
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className={`overflow-hidden rounded-2xl ${ui.detailAside}`}>
              <div className={`p-6 pb-4 ${ui.detailPanel}`}>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Contact Information</p>
              </div>
              <div className="p-6 pt-2">
                <div className="space-y-4">
                  {location ? (
                    <div className={`flex items-start gap-4 rounded-lg px-4 py-3 text-base ${ui.chip}`}>
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                      <span className="leading-relaxed">{location}</span>
                    </div>
                  ) : null}
                  {phone ? (
                    <div className={`flex items-center gap-4 rounded-lg px-4 py-3 text-base ${ui.chip}`}>
                      <Phone className="h-5 w-5 shrink-0" />
                      <span className="font-medium">{phone}</span>
                    </div>
                  ) : null}
                  {email ? (
                    <a href={`mailto:${email}`} className={`flex items-center gap-4 rounded-lg px-4 py-3 text-base ${ui.chip} transition hover:opacity-80`}>
                      <Mail className="h-5 w-5 shrink-0" />
                      <span className="break-all">{email}</span>
                    </a>
                  ) : null}
                  {website ? (
                    <a href={website} target="_blank" rel="noreferrer" className={`flex items-center gap-4 rounded-lg px-4 py-3 text-base ${ui.chip} transition hover:opacity-80`}>
                      <Globe className="h-5 w-5 shrink-0" />
                      <span className="break-all">{website}</span>
                    </a>
                  ) : null}
                </div>
                {website ? (
                  <a href={website} target="_blank" rel="noreferrer" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold ${ui.primaryButton} transition hover:opacity-90`}>
                    Visit Website
                    <ArrowRight className="h-5 w-5" />
                  </a>
                ) : null}
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden rounded-2xl ${ui.detailPanel}`}>
                <div className="px-6 py-4">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>Location Map</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </aside>
        </div>

        {related.length ? (
          <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${ui.eyebrow}`}>You may also like</p>
                <h2 className={`mt-3 text-3xl font-semibold ${ui.title}`}>Similar {taskLabel}</h2>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${ui.chip}`}>
                <Tag className="h-4 w-4" />
                {taskLabel}
              </span>
            </div>
            <div className={ui.relatedGrid}>
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} compact />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
