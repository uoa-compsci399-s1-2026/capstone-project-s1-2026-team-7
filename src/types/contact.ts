export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export const contactFormInitialState: ContactFormState = {
  status: 'idle',
  message: '',
}
