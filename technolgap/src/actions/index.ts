import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    input: z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
    }),
    accept: 'form',
    handler: async (input) => {
      const { data, error } = await resend.emails.send({
        from: 'Technolgap <onboarding@resend.dev>',
        to: ['technolgap@gmail.com'],
        subject: 'Message from Technolgap Contact Form',
        html: `Name: ${input.name}<br/>Email: ${input.email}<br/>Message: ${input.message}`,
      });

      if (error) {
        console.log(error)
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }
      return data;
    },
  }),
};