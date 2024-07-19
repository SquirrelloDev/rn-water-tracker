// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import {createClient} from 'jsr:@supabase/supabase-js@2'
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

Deno.serve(async (req) => {
    console.log(req)
    try {
        const {userId, currentStreak} = await req.json()
      console.log('Look! ', userId, currentStreak)
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {global: {headers: {Authorization: req.headers.get('Authorization')!}}}
        )
        const {data, error} = await supabase.from('users').select('longest_streak').eq('id', userId).single()
        if(error){
          throw error
        }
        const longestStreak = data.longest_streak
        if(currentStreak + 1 > longestStreak){
            const {error} = await supabase.from('users').update({longest_streak: currentStreak + 1}).eq('id', userId)
            if(error){
                throw error
            }
            return new Response(
                JSON.stringify({message: "Longest streak updated successfully!"}),
                {headers: {"Content-Type": "application/json"}, status: 200},
            )
        }
        return new Response(
            JSON.stringify({message: 'Longest streak is still higher than current streak'}),
            {headers: {"Content-Type": "application/json"}, status: 200},
        )
    } catch (err) {
        return new Response(String(err?.message ?? err), {status: 500})
    }

})
