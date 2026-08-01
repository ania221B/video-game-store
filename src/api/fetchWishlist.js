import { supabase } from '../lib'

export async function fetchWishlist () {
  const { data, error } = await supabase
    .from('wishlists')
    .select('games')
    .single()

  if (error?.code === 'PGRST116') return []
  if (error) {
    console.error('Failed to fetch wishlist', error)
    return []
  }
  return data?.games || []
}
export async function saveWishlist (games) {
  const { error } = await supabase
    .from('wishlists')
    .upsert({ games }, { onConflict: 'user_id' })

  if (error) console.error('Failed to save wishlist', error)
}
