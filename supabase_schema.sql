-- ==============================================================================
-- EXAM.NAINIX - COMPLETE SUPABASE DATABASE RESET & SETUP SCRIPT
-- Copy this entire code and run it in Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 0. CLEAN RESET: Drop any previous tables if they already exist
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.test_results CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;

-- 1. Students Table (छात्र प्रोफाइल और ईमेल लॉगिन क्रेडेंशियल्स)
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255),
    board_id VARCHAR(50) DEFAULT 'bseb',
    class_level VARCHAR(20) DEFAULT '10th',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Payments & Passes Table (Razorpay और बोर्ड पास)
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id VARCHAR(100) UNIQUE NOT NULL,
    order_id VARCHAR(100),
    student_email VARCHAR(255) REFERENCES public.students(email) ON DELETE SET NULL,
    amount NUMERIC(10, 2) DEFAULT 50.00,
    currency VARCHAR(10) DEFAULT 'INR',
    board_id VARCHAR(50),
    class_level VARCHAR(20),
    status VARCHAR(50) DEFAULT 'SUCCESS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Test Results & Scorecards Table (मॉक टेस्ट रिजल्ट्स और स्कोरकार्ड)
CREATE TABLE public.test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_email VARCHAR(255) REFERENCES public.students(email) ON DELETE CASCADE,
    subject_id VARCHAR(100),
    subject_name VARCHAR(255),
    chapter_title VARCHAR(255),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    division VARCHAR(50),
    time_spent_seconds INTEGER DEFAULT 0,
    board_name VARCHAR(100),
    class_level VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Student Bookmarks Table (सेव किए गए VVI प्रश्न)
CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_email VARCHAR(255) UNIQUE NOT NULL,
    bookmarked_ids JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Dynamic Questions Table (क्लाउड प्रश्न बैंक)
CREATE TABLE public.questions (
    id VARCHAR(100) PRIMARY KEY,
    board_id VARCHAR(50) NOT NULL,
    class_level VARCHAR(20) NOT NULL,
    subject_id VARCHAR(100) NOT NULL,
    chapter_id VARCHAR(100),
    question_hi TEXT NOT NULL,
    question_en TEXT,
    options JSONB NOT NULL,
    correct_option_index INTEGER NOT NULL,
    explanation_hi TEXT,
    explanation_en TEXT,
    vvi_tag VARCHAR(50) DEFAULT 'VVI 2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR ULTRA-FAST QUERIES
-- ==============================================================================
CREATE INDEX idx_students_email ON public.students(email);
CREATE INDEX idx_payments_email ON public.payments(student_email);
CREATE INDEX idx_test_results_email ON public.test_results(student_email);
CREATE INDEX idx_questions_lookup ON public.questions(board_id, class_level, subject_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for test_results" ON public.test_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for bookmarks" ON public.bookmarks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read for questions" ON public.questions FOR SELECT USING (true);
