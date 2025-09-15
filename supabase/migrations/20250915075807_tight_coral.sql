/*
  # Update wishes table for enhanced features

  1. Schema Changes
    - Change photo_url to photo_urls (array)
    - Add personal_note field
    - Add template_id field
    - Add festival_type and wedding_type fields
    - Add custom_colors field for personalization

  2. Security
    - Maintain existing RLS policies
    - Ensure backward compatibility
*/

-- Add new columns to wishes table
DO $$
BEGIN
  -- Add photo_urls array column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'photo_urls'
  ) THEN
    ALTER TABLE wishes ADD COLUMN photo_urls text[] DEFAULT '{}';
  END IF;

  -- Add personal_note column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'personal_note'
  ) THEN
    ALTER TABLE wishes ADD COLUMN personal_note text DEFAULT '';
  END IF;

  -- Add template_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'template_id'
  ) THEN
    ALTER TABLE wishes ADD COLUMN template_id text DEFAULT 'birthday-balloons';
  END IF;

  -- Add festival_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'festival_type'
  ) THEN
    ALTER TABLE wishes ADD COLUMN festival_type text;
  END IF;

  -- Add wedding_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'wedding_type'
  ) THEN
    ALTER TABLE wishes ADD COLUMN wedding_type text;
  END IF;

  -- Add custom_colors column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wishes' AND column_name = 'custom_colors'
  ) THEN
    ALTER TABLE wishes ADD COLUMN custom_colors jsonb;
  END IF;
END $$;

-- Migrate existing photo_url data to photo_urls array
UPDATE wishes 
SET photo_urls = CASE 
  WHEN photo_url IS NOT NULL AND photo_url != '' 
  THEN ARRAY[photo_url] 
  ELSE '{}' 
END
WHERE photo_urls = '{}' AND photo_url IS NOT NULL;

-- Update occasion constraint to be more flexible
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'wishes_occasion_check'
  ) THEN
    ALTER TABLE wishes DROP CONSTRAINT wishes_occasion_check;
  END IF;
END $$;

ALTER TABLE wishes ADD CONSTRAINT wishes_occasion_check 
CHECK (occasion = ANY (ARRAY['birthday'::text, 'anniversary'::text, 'wedding'::text, 'festival'::text]));