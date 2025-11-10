-- First, drop the old constraint
ALTER TABLE lessons DROP CONSTRAINT IF EXISTS lessons_week_number_check;

-- Add new constraint allowing week 0-8
ALTER TABLE lessons ADD CONSTRAINT lessons_week_number_check CHECK (week_number >= 0 AND week_number <= 8);

-- Insert placeholder lessons for course structure
INSERT INTO lessons (week_number, order_index, module_name, title, slug, description, vimeo_video_id, duration_seconds, publish_status)
VALUES
(0, 1, 'Origen', 'De dónde nace todo esto', 'origen-metodo', 'Historia, promesa y resultados (60M/363M views)', 'TO_REPLACE_1', 420, 'live'),
(1, 1, 'Verse real', 'Cómo verse real y orgánico', 'verse-real-organico', 'Principio: todo es contenido. Clips 5-10s como banco emocional', 'TO_REPLACE_2', 600, 'live'),
(2, 1, 'Clipping', 'Qué es el método clipping', 'metodo-clipping', 'Documentar vs crear; vivir mientras grabas', 'TO_REPLACE_3', 540, 'live'),
(3, 1, 'Cores & Verticales', 'Encuentra tus cores y verticales', 'cores-verticales', 'Onboarding + cuestionario (6 preguntas) + IA verticales', 'TO_REPLACE_5', 720, 'live'),
(4, 1, 'Inspiración', 'Cómo inspirarte (motores de búsqueda)', 'inspiracion-operativa', 'Motores de búsqueda en redes + tabla de inspos (Notion)', 'TO_REPLACE_6', 600, 'live'),
(5, 1, 'Match', 'Conectar inspos con clips', 'match-inspos-clips', 'Match emoción/idea ↔ clip real. De banco a historia', 'TO_REPLACE_8', 660, 'live'),
(6, 1, 'Edición Rítmica', 'Por qué 0.6–1.2s', 'edicion-ritmo', 'Ritmo 0.6/0.8/1.2s (BPM 90-120)', 'TO_REPLACE_9', 540, 'live'),
(6, 2, 'Edición Rítmica', 'Ejemplos de edición', 'ejemplos-edicion', 'Ejemplos prácticos paso a paso', 'TO_REPLACE_10', 780, 'live'),
(7, 1, 'Distribución', 'Cómo distribuir y ser constante', 'distribucion-constancia', 'Constancia → recordación; coherencia del mensaje', 'TO_REPLACE_11', 600, 'live'),
(8, 1, 'Equipo', 'Equipo mínimo recomendado', 'equipo-minimo', 'iPhone, Insta360, dron AI (opcional)', 'TO_REPLACE_12', 360, 'live');