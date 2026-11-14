import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {client} from '@/sanity/client'
import {readToken} from '@/sanity/env'

// The Studio's Presentation tab calls this to switch the site into draft view.
export const {GET} = defineEnableDraftMode({client: client.withConfig({token: readToken || ''})})
