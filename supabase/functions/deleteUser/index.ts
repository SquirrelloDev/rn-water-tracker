import {createClient} from 'jsr:@supabase/supabase-js@2'
import "jsr:@supabase/functions-js/edge-runtime.d.ts"


Deno.serve(async (req) => {
  try{
    const { userId, authId } = await req.json()
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        {global: {headers: {Authorization: req.headers.get('Authorization')!}}}
    )
    const { error } = await supabase.auth.admin.deleteUser(authId)
    if(error){
      throw error
    }
    const {error: queryError} = await supabase.rpc('wipe_user_data', {p_user_id: userId})
    if(queryError){
      throw queryError
    }
    return new Response(
        JSON.stringify({message: 'User successfully deleted!'}),
        { headers: { "Content-Type": "application/json" } },
    )
  }
  catch (err){
    return new Response(String(err?.message ?? err), {status: 500})
  }
})
