ALTER TABLE public.contact_messages ADD COLUMN phone text;

DROP POLICY "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  ((char_length(name) >= 1) AND (char_length(name) <= 100))
  AND ((char_length(email) >= 3) AND (char_length(email) <= 255))
  AND ((char_length(project_type) >= 1) AND (char_length(project_type) <= 100))
  AND ((char_length(message) >= 1) AND (char_length(message) <= 2000))
  AND (phone IS NULL OR (char_length(phone) >= 4 AND char_length(phone) <= 25))
);

COMMENT ON COLUMN public.contact_messages.phone IS 'Optional contact phone number including country code, e.g. +91 9876543210';