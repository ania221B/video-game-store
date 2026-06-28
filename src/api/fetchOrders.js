import { supabase } from '../lib'

export async function fetchOrders () {
  const { data, error } = await supabase
    .from('orders')
    .select('id, created_at, order_items')

  if (error?.code === 'PGRST116') return []
  if (error) {
    console.error('Failed to fetch orders', error)
    return []
  }
  return data || []
}

export async function fetchSingleOrder (id) {
  const { data, error } = await supabase
    .from('orders')
    .select('id, created_at, order_items')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Failed to fetch order', error)
    return null
  }
  return data
}

export async function saveOrder (order_items) {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { error, data } = await supabase
    .from('orders')
    .insert({ order_items, user_id: user.id })
    .select('id')
    .single()

  if (error) console.error('Failed to save order', error)
  return data?.id
}
