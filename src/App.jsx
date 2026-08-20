import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BreadcrumbNav from './components/BreadcrumbNav';
import BottomNav from './components/BottomNav';
import BoardSelectStep from './components/BoardSelectStep';
import SubjectSelectStep from './components/SubjectSelectStep';
import ChapterSelectStep from './components/ChapterSelectStep';
import TestEngine from './components/TestEngine';
import TestResults from './components/TestResults';
import AdminLoginStep from './components/AdminLoginStep';
import PaymentModal from './components/PaymentModal';
import ArchitectureModal from './components/ArchitectureModal';
import BookmarksModal from './components/BookmarksModal';
import LoginRequiredModal from './components/LoginRequiredModal';
import { BOARDS_DATA, SUBJECTS_DATA, MOCK_QUESTIONS } from './data/mockData';
import techBg from './assets/techBg.jpg';
import { 
  authOrRegisterStudent, 
  recordPaymentTransaction, 
  saveStudentTestResult, 
  syncStudentBookmarks, 
  fetchStudentBookmarks,
  fetchStudentPasses
} from './services/supabaseService';

const STEP_TO_PATH = {
  landing: '/',
  board: '/board',
  subject: '/subject',
  chapter: '/chapter',
  test: '/test',
  results: '/results',
  admin: '/admin'
};

const PATH_TO_STEP = {
  '/': 'landing',
  '/home': 'landing',
  '/board': 'board',
  '/subject': 'subject',
  '/subjects': 'subject',
  '/chapter': 'chapter',
  '/chapters': 'chapter',
  '/test': 'test',
  '/results': 'results',
  '/result': 'results',
  '/admin': 'admin',
  '/login': 'admin'
};

const getStepFromPath = (path) => {
  const normalized = path.toLowerCase().replace(/\/$/, '') || '/';
  return PATH_TO_STEP[normalized] || 'landing';
};

export default function App() {
  // Student Login Session State with LocalStorage persistence
  const [studentSession, setStudentSession] = useState(() => {
    try {
      const saved = localStorage.getItem('nainix_student_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Step state with URL pathname synchronization & Authentication Route Guard
  const [currentStep, setCurrentStepState] = useState(() => {
    const initialStep = getStepFromPath(window.location.pathname);
    const protectedSteps = ['board', 'subject', 'chapter', 'test', 'results'];
    try {
      const savedSession = localStorage.getItem('nainix_student_session');
      if (!savedSession && protectedSteps.includes(initialStep)) {
        return 'landing';
      }
    } catch { }
    return initialStep;
  });

  const setCurrentStep = (newStep) => {
    const protectedSteps = ['board', 'subject', 'chapter', 'test', 'results'];
    let activeSession = studentSession;
    if (!activeSession) {
      try {
        const saved = localStorage.getItem('nainix_student_session');
        if (saved) activeSession = JSON.parse(saved);
      } catch {}
    }

    if (!activeSession && protectedSteps.includes(newStep)) {
      setShowLoginModal(true);
      setCurrentStepState('landing');
      if (window.location.pathname !== '/') {
        window.history.pushState({ step: 'landing' }, '', '/');
      }
      return;
    }

    setShowLoginModal(false);
    setCurrentStepState(newStep);
    const targetPath = STEP_TO_PATH[newStep] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ step: newStep }, '', targetPath);
    }
  };

  // Listen to browser Back/Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const step = getStepFromPath(window.location.pathname);
      const protectedSteps = ['board', 'subject', 'chapter', 'test', 'results'];
      let activeSession = studentSession;
      if (!activeSession) {
        try {
          const saved = localStorage.getItem('nainix_student_session');
          if (saved) activeSession = JSON.parse(saved);
        } catch {}
      }

      if (!activeSession && protectedSteps.includes(step)) {
        setShowLoginModal(true);
        setCurrentStepState('landing');
      } else {
        setCurrentStepState(step);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [studentSession]);

  // Session persistence
  useEffect(() => {
    try {
      if (studentSession) {
        localStorage.setItem('nainix_student_session', JSON.stringify(studentSession));
      } else {
        localStorage.removeItem('nainix_student_session');
      }
    } catch { }
  }, [studentSession]);

  const handleStudentLoginSuccess = (userData, targetStep = 'board') => {
    setStudentSession(userData);
    if (userData.boardId) {
      const matchingBoard = BOARDS_DATA.find(b => b.id === userData.boardId);
      if (matchingBoard) setSelectedBoard(matchingBoard);
    }
    if (userData.classLevel) {
      setSelectedClass(userData.classLevel);
    }

    try {
      localStorage.setItem('nainix_student_session', JSON.stringify(userData));
    } catch {}
    setShowLoginModal(false);

    // Sync in background with Supabase cloud
    if (userData?.email) {
      authOrRegisterStudent(userData.email, '', {
        name: userData.name,
        boardId: userData.boardId,
        classLevel: userData.classLevel
      }).then(cloudUser => {
        if (cloudUser?.isCloud) {
          setStudentSession(prev => ({ ...prev, ...cloudUser }));
        }
      }).catch(() => {});

      // Restore user's cloud bookmarks
      fetchStudentBookmarks(userData.email).then(remoteBookmarks => {
        if (remoteBookmarks && Array.isArray(remoteBookmarks) && remoteBookmarks.length > 0) {
          setBookmarkedQuestionIds(prev => Array.from(new Set([...prev, ...remoteBookmarks])));
        }
      }).catch(() => {});

      // Restore user's unlocked passes from Supabase
      fetchStudentPasses(userData.email).then(passes => {
        if (passes && Array.isArray(passes) && passes.length > 0) {
          const allSubjectIds = SUBJECTS_DATA.map(s => s.id);
          setUnlockedSubjects(prev => Array.from(new Set([...prev, ...allSubjectIds])));
        }
      }).catch(() => {});
    }

    if (targetStep) {
      setCurrentStepState(targetStep);
      const targetPath = STEP_TO_PATH[targetStep] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ step: targetStep }, '', targetPath);
      }
    }
  };

  const handleStudentLogout = () => {
    setStudentSession(null);
    try {
      localStorage.removeItem('nainix_student_session');
    } catch {}
    setCurrentStep('landing');
  };

  // Hierarchy selections
  const [selectedBoard, setSelectedBoard] = useState(BOARDS_DATA[0]); // BSEB default
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Unlocked subjects state with LocalStorage persistence (clean empty default)
  const [unlockedSubjects, setUnlockedSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('nainix_unlocked_subjects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Bookmarked VVI Question IDs state with LocalStorage persistence (clean empty default)
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nainix_bookmarked_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active test execution & result payload
  const [activeTestQuestions, setActiveTestQuestions] = useState([]);
  const [testResultData, setTestResultData] = useState(null);

  // Modals
  const [paymentSubject, setPaymentSubject] = useState(null);
  const [showArchModal, setShowArchModal] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  // Set crisp light theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // LocalStorage persistence
  useEffect(() => {
    try {
      localStorage.setItem('nainix_unlocked_subjects', JSON.stringify(unlockedSubjects));
    } catch { }
  }, [unlockedSubjects]);

  useEffect(() => {
    try {
      localStorage.setItem('nainix_bookmarked_ids', JSON.stringify(bookmarkedQuestionIds));
    } catch { }
  }, [bookmarkedQuestionIds]);

  // Toggle bookmark function with cloud sync
  const handleToggleBookmark = (questionId) => {
    setBookmarkedQuestionIds(prev => {
      const next = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];

      if (studentSession?.email) {
        syncStudentBookmarks(studentSession.email, next);
      }
      return next;
    });
  };

  // Filtered subjects list matching selected board & class
  const boardFilteredSubjects = SUBJECTS_DATA.filter(sub => {
    if (sub.classLevel !== selectedClass) return false;
    if (selectedBoard && sub.boardId && sub.boardId !== selectedBoard.id) return false;
    return true;
  });

  // Navigation step helper
  const handleNavigateStep = (targetStep) => {
    setCurrentStep(targetStep);
  };

  // 1. From Hero or Landing -> Go to Board Select Step
  const handleStartBoardSelection = () => {
    setCurrentStep('board');
  };

  // 2. From Board Select -> Go to Subject Select Step
  const handleContinueToSubjectSelect = () => {
    setCurrentStep('subject');
  };

  // 3. From Subject Select -> Go to Chapter Select Step
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentStep('chapter');
  };

  // Helper to randomize / shuffle questions array (Fisher-Yates)
  const shuffleArray = (array) => {
    if (!array || !array.length) return [];
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // 4. Launch Chapter Test
  const handleStartChapterTest = (chapter, subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(chapter);

    // Extract chapter questions or fallback to mock set
    let questions = chapter.questions || [];
    if (!questions.length) {
      questions = MOCK_QUESTIONS[subject.id] || MOCK_QUESTIONS.c10_phy_sci;
    }
    setActiveTestQuestions(shuffleArray(questions));
    setCurrentStep('test');
  };

  // 4b. Launch Full Subject Test
  const handleStartFullSubjectTest = (subject) => {
    setSelectedSubject(subject);
    setSelectedChapter('all');

    // Aggregate questions from all chapters or fallback
    let allQuestions = [];
    if (subject.chapters) {
      subject.chapters.forEach(ch => {
        if (ch.questions) allQuestions.push(...ch.questions);
      });
    }
    if (!allQuestions.length) {
      allQuestions = MOCK_QUESTIONS[subject.id] || MOCK_QUESTIONS.c10_phy_sci;
    }
    setActiveTestQuestions(shuffleArray(allQuestions));
    setCurrentStep('test');
  };

  // 4c. Launch Custom Multi-Chapter Combined Test
  const handleStartCustomTest = (customConfig) => {
    const { chapters, questionCount } = customConfig;
    setSelectedChapter('custom_combo');

    let combinedQuestions = [];
    chapters.forEach(ch => {
      if (ch.questions && ch.questions.length) {
        combinedQuestions.push(...ch.questions);
      }
    });

    if (!combinedQuestions.length && selectedSubject) {
      combinedQuestions = MOCK_QUESTIONS[selectedSubject.id] || MOCK_QUESTIONS.c10_phy_sci;
    }

    const shuffled = shuffleArray(combinedQuestions);
    const count = Math.min(questionCount || 25, shuffled.length);
    setActiveTestQuestions(shuffled.slice(0, count));
    setCurrentStep('test');
  };

  // Quick Start Free Exam from Hero
  const handleStartFreeChallengeFromHero = () => {
    const freeSubject = boardFilteredSubjects.find(s => s.isFree) || SUBJECTS_DATA[0];
    handleStartFullSubjectTest(freeSubject);
  };

  // Payment triggers
  const handleUnlockSubject = (subject) => {
    setPaymentSubject(subject);
  };

  const handlePaymentSuccess = (_subjectId, txData) => {
    // 1 Payment unlocks ALL subjects for the entire Board/Class pass!
    const allSubjectIds = SUBJECTS_DATA.map(s => s.id);
    setUnlockedSubjects(prev => Array.from(new Set([...prev, ...allSubjectIds])));
    setPaymentSubject(null);

    // Record in Supabase
    if (txData?.paymentId) {
      recordPaymentTransaction({
        paymentId: txData.paymentId,
        orderId: txData.orderId,
        studentEmail: studentSession?.email || txData.prefill?.email,
        boardId: selectedBoard?.id,
        classLevel: selectedClass,
        amount: txData.amount || 50,
        currency: txData.currency || 'INR'
      }).catch(() => {});
    }
  };

  // Test finished -> Results
  const handleFinishTest = (results) => {
    setTestResultData(results);
    setCurrentStep('results');

    // Save test result to Supabase
    if (results) {
      saveStudentTestResult({
        studentEmail: studentSession?.email || 'anonymous',
        subjectId: selectedSubject?.id || 'all_subjects',
        subjectName: selectedSubject?.name || 'Mock Exam',
        chapterTitle: typeof selectedChapter === 'string' ? (selectedChapter === 'all' ? 'Full Mock Test' : selectedChapter) : (selectedChapter?.title || 'Chapter Test'),
        score: results.score || 0,
        totalQuestions: results.total || (results.questions?.length || 0),
        percentage: results.percentage || (results.total ? Math.round((results.score / results.total) * 100) : 0),
        division: results.division || '1st Division',
        timeSpentSeconds: results.timeSpentSeconds || results.durationSeconds || 0,
        boardName: selectedBoard?.name || 'BSEB',
        classLevel: selectedClass || '10th'
      }).catch(() => {});
    }
  };

  // Retake test (re-shuffles questions every single time)
  const handleRetakeTest = () => {
    setActiveTestQuestions(prev => shuffleArray(prev));
    setCurrentStep('test');
  };

  // Back home
  const handleBackToHome = () => {
    setCurrentStep('landing');
    setSelectedSubject(null);
    setSelectedChapter(null);
    setTestResultData(null);
  };

  return (
    <div className="app-shell">

      {/* High Resolution Tech Background Layer with White Semi-Transparent Overlay */}
      <div 
        className="app-bg-layer"
        style={{ 
          backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.78), rgba(248, 250, 252, 0.78)), url("${techBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }} 
      />

      {/* Navbar */}
      {currentStep !== 'test' && (
        <Navbar
          currentStep={currentStep}
          onBack={() => {
            if (currentStep === 'chapter') setCurrentStep('subject');
            else if (currentStep === 'subject') setCurrentStep('board');
            else setCurrentStep('landing');
          }}
          onGoHome={handleBackToHome}
          onAdminClick={() => setCurrentStep('admin')}
          onOpenBookmarks={() => setShowBookmarksModal(true)}
          bookmarkedCount={bookmarkedQuestionIds.length}
          onOpenArchModal={() => setShowArchModal(true)}
          studentSession={studentSession}
          onLoginSuccess={handleStudentLoginSuccess}
          onLogout={handleStudentLogout}
        />
      )}

      {/* Breadcrumb Path Tracking */}
      {currentStep !== 'landing' && currentStep !== 'test' && currentStep !== 'admin' && (
        <BreadcrumbNav
          currentStep={currentStep}
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          selectedChapter={selectedChapter}
          onNavigate={handleNavigateStep}
        />
      )}

      {/* Effective active subject fallback to prevent blank renders */}
      {(() => {
        const effectiveSubject = selectedSubject || boardFilteredSubjects[0] || SUBJECTS_DATA[0];
        
        return (
          <div className="view-container">

            {/* Step 0: Landing Page (Pure Hero Page) */}
            {currentStep === 'landing' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <Hero
                  selectedBoard={selectedBoard}
                  selectedClass={selectedClass}
                  onSelectBoard={setSelectedBoard}
                  onSelectClass={setSelectedClass}
                  onContinueToBoardSelect={handleStartBoardSelection}
                  onStartFreeTest={handleStartFreeChallengeFromHero}
                  studentSession={studentSession}
                  onLoginSuccess={handleStudentLoginSuccess}
                  onLogout={handleStudentLogout}
                />
              </div>
            )}

            {/* Step 1: Board & Exam Select */}
            {currentStep === 'board' && (
              <BoardSelectStep
                selectedBoard={selectedBoard}
                selectedClass={selectedClass}
                onSelectBoard={setSelectedBoard}
                onSelectClass={setSelectedClass}
                onContinueToSubject={handleContinueToSubjectSelect}
              />
            )}

            {/* Step 2: Subject Select */}
            {currentStep === 'subject' && (
              <SubjectSelectStep
                selectedBoard={selectedBoard}
                selectedClass={selectedClass}
                subjects={boardFilteredSubjects.length ? boardFilteredSubjects : SUBJECTS_DATA}
                unlockedSubjects={unlockedSubjects}
                onSelectSubject={handleSelectSubject}
                onUnlockSubject={handleUnlockSubject}
              />
            )}

            {/* Step 3: Chapter Select */}
            {currentStep === 'chapter' && (
              <ChapterSelectStep
                subject={effectiveSubject}
                isUnlocked={effectiveSubject.isFree || unlockedSubjects.includes(effectiveSubject.id)}
                onUnlockSubject={handleUnlockSubject}
                onBackToSubjects={() => setCurrentStep('subject')}
                onStartChapterTest={handleStartChapterTest}
                onStartFullSubjectTest={handleStartFullSubjectTest}
                onStartCustomTest={handleStartCustomTest}
              />
            )}

            {/* Step 4: Test Engine */}
            {currentStep === 'test' && (
              <TestEngine
                subject={effectiveSubject}
                questions={activeTestQuestions.length ? activeTestQuestions : (effectiveSubject.chapters ? (effectiveSubject.chapters[0].questions || MOCK_QUESTIONS.c10_phy_sci) : MOCK_QUESTIONS.c10_phy_sci)}
                onFinishTest={handleFinishTest}
                onCancelTest={() => setCurrentStep('chapter')}
                onToggleBookmark={handleToggleBookmark}
                bookmarkedIds={bookmarkedQuestionIds}
              />
            )}

            {/* Step 5: Test Results & Detailed Solutions */}
            {currentStep === 'results' && testResultData && (
              <TestResults
                resultData={testResultData}
                onRetakeTest={handleRetakeTest}
                onBackToHome={handleBackToHome}
                onToggleBookmark={handleToggleBookmark}
                bookmarkedIds={bookmarkedQuestionIds}
              />
            )}

            {/* Step 6: Admin Portal & Login Page */}
            {currentStep === 'admin' && (
              <AdminLoginStep
                onBackToHome={() => setCurrentStep('landing')}
              />
            )}

          </div>
        );
      })()}

      {/* Mobile Bottom Bar (Hidden on landing, test & admin) */}
      {currentStep !== 'test' && currentStep !== 'landing' && currentStep !== 'admin' && (
        <BottomNav
          currentView={currentStep}
          onGoHome={handleBackToHome}
          onStartFreeTest={handleStartFreeChallengeFromHero}
          onOpenUnlock={() => {
            const lockedSub = SUBJECTS_DATA.find(s => !unlockedSubjects.includes(s.id) && !s.isFree);
            if (lockedSub) setPaymentSubject(lockedSub);
          }}
          onOpenBookmarks={() => setShowBookmarksModal(true)}
          bookmarkedCount={bookmarkedQuestionIds.length}
        />
      )}

      {/* Modals */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleStudentLoginSuccess}
      />

      {paymentSubject && (
        <PaymentModal
          subject={paymentSubject}
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          studentSession={studentSession}
          onClose={() => setPaymentSubject(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {showBookmarksModal && (
        <BookmarksModal
          bookmarkedIds={bookmarkedQuestionIds}
          onRemoveBookmark={handleToggleBookmark}
          onClose={() => setShowBookmarksModal(false)}
        />
      )}

      {showArchModal && (
        <ArchitectureModal
          onClose={() => setShowArchModal(false)}
        />
      )}

    </div>
  );
}
