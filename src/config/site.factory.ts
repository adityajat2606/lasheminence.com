import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'market-utility',
  navbar: 'utility-bar',
  footer: 'minimal-footer',
  homeLayout: 'listing-home',
  motionPack: 'utility-snappy',
  primaryTask: 'listing',
  enabledTasks: ['listing'],
  taskLayouts: {
    listing: 'listing-directory',
  },
}
