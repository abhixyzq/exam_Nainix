import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Validates and logs in an existing student from Supabase database by email
 * @param {string} email student email address
 * @param {string} password entered password
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function loginStudent(email, password = '') {
  const cleanedEmail = String(email).trim().toLowerCase();

  if (!isSupabaseConfigured()) {
    // Offline fallback
    return {
      success: true,
      user: {
        id: `local_${cleanedEmail}`,
        email: cleanedEmail,
        name: cleanedEmail.split('@')[0],
        boardId: 'bseb',
        classLevel: '10th',
        isCloud: false,
        loggedInAt: new Date().toISOString()
      }
    };
  }

  try {
    const { data: student, error: fetchErr } = await supabase
      .from('students')
      .select('*')
      .eq('email', cleanedEmail)
      .maybeSingle();

    if (fetchErr) {
      console.warn('Supabase login check error:', fetchErr.message);
      return {
        success: false,
        error: 'डेटाबेस से कनेक्ट करने में समस्या हुई। कृपया पुनः प्रयास करें। (Database connection error)'
      };
    }

    if (!student) {
      return {
        success: false,
        error: 'यह ईमेल पंजीकृत नहीं है! कृपया पहले "नया खाता बनाएं" (Email not registered! Please create an account first).'
      };
    }

    // If student has a password saved in database, verify it
    if (student.password && password && student.password !== password) {
      return {
        success: false,
        error: 'गलत पासवर्ड दर्ज किया गया है! कृपया सही पासवर्ड डालें (Incorrect password).'
      };
    }

    return {
      success: true,
      user: {
        id: student.id,
        email: student.email,
        name: student.name || student.email.split('@')[0],
        boardId: student.board_id || 'bseb',
        classLevel: student.class_level || '10th',
        isCloud: true,
        loggedInAt: new Date().toISOString()
      }
    };
  } catch (err) {
    console.error('Exception during student login verification:', err);
    return {
      success: false,
      error: 'लॉग इन सत्यापन विफल रहा। (Login verification failed)'
    };
  }
}

/**
 * Registers a new student in Supabase database by email
 * @param {Object} data { email, name, password, boardId, classLevel }
 * @returns {Promise<{ success: boolean, user?: Object, error?: string }>}
 */
export async function registerStudent({ email, name, password, boardId = 'bseb', classLevel = '10th' }) {
  const cleanedEmail = String(email).trim().toLowerCase();
  const cleanedName = String(name).trim();

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      user: {
        id: `local_${cleanedEmail}`,
        email: cleanedEmail,
        name: cleanedName || cleanedEmail.split('@')[0],
        boardId,
        classLevel,
        isCloud: false,
        loggedInAt: new Date().toISOString()
      }
    };
  }

  try {
    // 1. Check if student email already exists
    const { data: existingStudent } = await supabase
      .from('students')
      .select('id, email')
      .eq('email', cleanedEmail)
      .maybeSingle();

    if (existingStudent) {
      return {
        success: false,
        error: 'यह ईमेल पहले से पंजीकृत है! कृपया "लॉग इन" करें (This email is already registered. Please login).'
      };
    }

    // 2. Insert new student record
    const newStudentData = {
      email: cleanedEmail,
      name: cleanedName || cleanedEmail.split('@')[0],
      password: password || null,
      board_id: boardId,
      class_level: classLevel,
      created_at: new Date().toISOString()
    };

    const { data: createdStudent, error: insertErr } = await supabase
      .from('students')
      .insert([newStudentData])
      .select()
      .single();

    if (insertErr) {
      console.error('Supabase registration error:', insertErr);
      return {
        success: false,
        error: `खाता नहीं बनाया जा सका: ${insertErr.message}`
      };
    }

    return {
      success: true,
      user: {
        id: createdStudent.id,
        email: createdStudent.email,
        name: createdStudent.name,
        boardId: createdStudent.board_id,
        classLevel: createdStudent.class_level,
        isCloud: true,
        loggedInAt: new Date().toISOString()
      }
    };
  } catch (err) {
    console.error('Exception during student registration:', err);
    return {
      success: false,
      error: 'खाता निर्माण में त्रुटि हुई। कृपया पुनः प्रयास करें।'
    };
  }
}

/**
 * Authenticates or auto-registers a student by email (legacy helper)
 * @param {string} email
 * @param {string} [password]
 * @param {Object} [meta]
 * @returns {Promise<Object>}
 */
export async function authOrRegisterStudent(email, password = '', meta = {}) {
  const cleanedEmail = String(email).trim().toLowerCase();
  const loginRes = await loginStudent(cleanedEmail, password);
  if (loginRes.success && loginRes.user) {
    return loginRes.user;
  }
  const regRes = await registerStudent({ email: cleanedEmail, name: meta.name || cleanedEmail.split('@')[0], password, boardId: meta.boardId, classLevel: meta.classLevel });
  if (regRes.success && regRes.user) {
    return regRes.user;
  }
  return {
    id: `local_${cleanedEmail}`,
    email: cleanedEmail,
    name: meta.name || cleanedEmail.split('@')[0],
    boardId: meta.boardId || 'bseb',
    classLevel: meta.classLevel || '10th',
    isCloud: false,
    loggedInAt: new Date().toISOString()
  };
}

/**
 * Records a Razorpay or UPI payment in Supabase and activates pass
 * @param {Object} paymentData
 */
export async function recordPaymentTransaction(paymentData) {
  if (!isSupabaseConfigured()) return null;

  try {
    const payload = {
      payment_id: paymentData.paymentId,
      order_id: paymentData.orderId || null,
      student_email: paymentData.studentEmail || null,
      amount: paymentData.amount || 50,
      currency: paymentData.currency || 'INR',
      board_id: paymentData.boardId || null,
      class_level: paymentData.classLevel || null,
      status: 'SUCCESS',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('payments')
      .insert([payload])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Could not record payment to Supabase:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn('Exception recording payment in Supabase:', err);
    return null;
  }
}

/**
 * Saves a completed test result / scorecard to Supabase
 * @param {Object} resultData
 */
export async function saveStudentTestResult(resultData) {
  if (!isSupabaseConfigured()) return null;

  try {
    const payload = {
      student_email: resultData.studentEmail || null,
      subject_id: resultData.subjectId || null,
      subject_name: resultData.subjectName || null,
      chapter_title: resultData.chapterTitle || 'Full Mock Test',
      score: resultData.score,
      total_questions: resultData.totalQuestions,
      percentage: resultData.percentage,
      division: resultData.division || '1st Division',
      time_spent_seconds: resultData.timeSpentSeconds || 0,
      board_name: resultData.boardName || null,
      class_level: resultData.classLevel || null,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('test_results')
      .insert([payload])
      .select()
      .maybeSingle();

    if (error) {
      console.warn('Could not save test result to Supabase:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn('Exception saving test result in Supabase:', err);
    return null;
  }
}

/**
 * Syncs bookmarked question IDs with Supabase
 * @param {string} studentEmail
 * @param {string[]} bookmarkIds
 */
export async function syncStudentBookmarks(studentEmail, bookmarkIds) {
  if (!isSupabaseConfigured() || !studentEmail) return;

  try {
    const payload = {
      student_email: studentEmail,
      bookmarked_ids: bookmarkIds,
      updated_at: new Date().toISOString()
    };

    await supabase
      .from('bookmarks')
      .upsert([payload], { onConflict: 'student_email' });
  } catch (err) {
    console.warn('Exception syncing bookmarks in Supabase:', err);
  }
}

/**
 * Fetches bookmarked question IDs for a student from Supabase
 * @param {string} studentEmail
 * @returns {Promise<string[]|null>}
 */
export async function fetchStudentBookmarks(studentEmail) {
  if (!isSupabaseConfigured() || !studentEmail) return null;

  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('bookmarked_ids')
      .eq('student_email', studentEmail)
      .maybeSingle();

    if (error || !data) return null;
    return data.bookmarked_ids || [];
  } catch (err) {
    console.warn('Exception fetching bookmarks from Supabase:', err);
    return null;
  }
}

/**
 * Fetches past test results for a student from Supabase
 * @param {string} studentEmail
 * @returns {Promise<Array>}
 */
export async function fetchStudentTestHistory(studentEmail) {
  if (!isSupabaseConfigured() || !studentEmail) return [];

  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_email', studentEmail)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.warn('Could not fetch test history from Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('Exception fetching test history from Supabase:', err);
    return [];
  }
}

/**
 * Fetches unlocked passes / payments for a student from Supabase
 * @param {string} studentEmail
 * @returns {Promise<Array>}
 */
export async function fetchStudentPasses(studentEmail) {
  if (!isSupabaseConfigured() || !studentEmail) return [];

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_email', studentEmail)
      .eq('status', 'SUCCESS');

    if (error || !data) return [];
    return data;
  } catch (err) {
    console.warn('Exception fetching student passes from Supabase:', err);
    return [];
  }
}

/**
 * Fetches live real-time metrics for Admin Portal from Supabase
 * @returns {Promise<Object>}
 */
export async function fetchAdminDashboardStats() {
  if (!isSupabaseConfigured()) {
    return {
      totalStudents: 0,
      totalPayments: 0,
      totalTests: 0,
      totalRevenue: 0
    };
  }

  try {
    const [studentsRes, paymentsRes, testsRes] = await Promise.all([
      supabase.from('students').select('id', { count: 'exact', head: true }),
      supabase.from('payments').select('amount, status'),
      supabase.from('test_results').select('id', { count: 'exact', head: true })
    ]);

    const totalStudents = studentsRes.count || 0;
    const totalTests = testsRes.count || 0;
    const payments = paymentsRes.data || [];
    const successfulPayments = payments.filter(p => p.status === 'SUCCESS');
    const totalRevenue = successfulPayments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

    return {
      totalStudents,
      totalPayments: successfulPayments.length,
      totalTests,
      totalRevenue
    };
  } catch (err) {
    console.warn('Exception fetching admin stats from Supabase:', err);
    return {
      totalStudents: 0,
      totalPayments: 0,
      totalTests: 0,
      totalRevenue: 0
    };
  }
}
