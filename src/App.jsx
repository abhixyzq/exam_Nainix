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
    if (!studentSession && protectedSteps.includes(newStep)) {
      setShowLoginModal(true);
      setCurrentStepState('landing');
      if (window.location.pathname !== '/') {
        window.history.pushState({ step: 'landing' }, '', '/');
      }
      return;
    }

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
      if (!studentSession && protectedSteps.includes(step)) {
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

  const handleStudentLoginSuccess = (userData) => {
    setStudentSession(userData);
    setShowLoginModal(false);
  };

  const handleStudentLogout = () => {
    setStudentSession(null);
    setCurrentStep('landing');
  };

  // Hierarchy selections
  const [selectedBoard, setSelectedBoard] = useState(BOARDS_DATA[0]); // BSEB default
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Unlocked subjects state with LocalStorage persistence
  const [unlockedSubjects, setUnlockedSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('nainix_unlocked_subjects');
      return saved ? JSON.parse(saved) : ['c10_phy_sci', 'c10_eng'];
    } catch {
      return ['c10_phy_sci', 'c10_eng'];
    }
  });

  // Bookmarked VVI Question IDs state with LocalStorage persistence
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nainix_bookmarked_ids');
      return saved ? JSON.parse(saved) : ['q10_sci_1', 'q10_math_3'];
    } catch {
      return ['q10_sci_1', 'q10_math_3'];
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

  // Toggle bookmark function
  const handleToggleBookmark = (questionId) => {
    setBookmarkedQuestionIds(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
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
      if (ch.questions && ch.questions.length > 0) {
        combinedQuestions.push(...ch.questions);
      }
    });

    if (!combinedQuestions.length) {
      combinedQuestions = MOCK_QUESTIONS[selectedSubject?.id || 'c10_phy_sci'] || MOCK_QUESTIONS.c10_phy_sci;
    }

    // Shuffle and limit to requested questionCount
    const finalQuestions = shuffleArray(combinedQuestions).slice(0, questionCount);

    setActiveTestQuestions(finalQuestions);
    setCurrentStep('test');
  };

  // Start Free Challenge from Hero
  const handleStartFreeChallengeFromHero = () => {
    const freeSubject = boardFilteredSubjects.find(s => s.isFree) || SUBJECTS_DATA[0];
    handleStartFullSubjectTest(freeSubject);
  };

  // Payment triggers
  const handleUnlockSubject = (subject) => {
    setPaymentSubject(subject);
  };

  const handlePaymentSuccess = () => {
    // 1 Payment unlocks ALL subjects for the entire Board/Class pass!
    const allSubjectIds = SUBJECTS_DATA.map(s => s.id);
    setUnlockedSubjects(prev => Array.from(new Set([...prev, ...allSubjectIds])));
    setPaymentSubject(null);
  };

  // Test finished -> Results
  const handleFinishTest = (results) => {
    setTestResultData(results);
    setCurrentStep('results');
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
          onOpenAdmin={() => setCurrentStep('admin')}
          onGoHome={() => setCurrentStep('landing')}
          studentSession={studentSession}
          onLogout={handleStudentLogout}
        />
      )}

      {/* Step Breadcrumb Navigator */}
      {currentStep !== 'test' && currentStep !== 'landing' && currentStep !== 'admin' && (
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
                  onContinueToBoardSelect={() => setCurrentStep('board')}
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
