/*
  # Create wishes table and storage

  1. New Tables
    - `wishes` table for storing wish website data
      - `id` (uuid, primary key)
      - `occasion` (text) - birthday, anniversary, wedding, festival
      - `recipient_name` (text) - name of the person being celebrated
      - `photo_url` (text, optional) - URL to uploaded photo
      - `generated_slug` (text, unique) - unique slug for the wish page
      - `greeting_text` (text) - the greeting message
      - `created_at` (timestamp)

  2. Storage
    - Create bucket for wish photos with public access

  3. Security
    - Enable RLS on wishes table
    - Allow public read access for wishes (since they need to be shareable)
    - Allow public insert for creating new wishes
*/

-- Create wishes table
CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occasion text NOT NULL CHECK (occasion IN ('birthday', 'anniversary', 'wedding', 'festival')),
  recipient_name text NOT NULL,
  photo_url text,
  generated_slug text UNIQUE NOT NULL,
  greeting_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_wishes_slug ON wishes (generated_slug);

-- Enable RLS
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Allow public read access (wishes need to be shareable)
CREATE POLICY "Anyone can read wishes"
  ON wishes
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert (anyone can create wishes)
CREATE POLICY "Anyone can create wishes"
  ON wishes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('wish-photos', 'wish-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to photo bucket
CREATE POLICY "Anyone can upload wish photos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'wish-photos');

-- Allow public reads of wish photos
CREATE POLICY "Anyone can view wish photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'wish-photos');