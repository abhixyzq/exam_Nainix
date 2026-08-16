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
import PaymentModal from './components/PaymentModal';
import ArchitectureModal from './components/ArchitectureModal';
import BookmarksModal from './components/BookmarksModal';
import { BOARDS_DATA, SUBJECTS_DATA, MOCK_QUESTIONS } from './data/mockData';
import techBg from './assets/techBg.jpg';

export default function App() {
  // Step state: 'landing' | 'board' | 'subject' | 'chapter' | 'test' | 'results'
  const [currentStep, setCurrentStep] = useState('landing');

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

  // 4. Launch Chapter Test
  const handleStartChapterTest = (chapter, subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(chapter);

    // Extract chapter questions or fallback to mock set
    let questions = chapter.questions || [];
    if (!questions.length) {
      questions = MOCK_QUESTIONS[subject.id] || MOCK_QUESTIONS.c10_phy_sci;
    }
    setActiveTestQuestions(questions);
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
    setActiveTestQuestions(allQuestions);
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

  const handlePaymentSuccess = (subjectId) => {
    setUnlockedSubjects(prev => Array.from(new Set([...prev, subjectId])));
    setPaymentSubject(null);
  };

  // Test finished -> Results
  const handleFinishTest = (results) => {
    setTestResultData(results);
    setCurrentStep('results');
  };

  // Retake test
  const handleRetakeTest = () => {
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
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          onOpenBoardSelect={() => setCurrentStep('board')}
          onOpenBookmarks={() => setShowBookmarksModal(true)}
          bookmarkedCount={bookmarkedQuestionIds.length}
          onOpenArchModal={() => setShowArchModal(true)}
        />
      )}

      {/* Step Breadcrumb Navigator */}
      {currentStep !== 'test' && currentStep !== 'landing' && (
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
                  onGoToSubjects={() => {
                    if (!selectedSubject) setSelectedSubject(effectiveSubject);
                    setCurrentStep('subject');
                  }}
                  onStartFreeTest={handleStartFreeChallengeFromHero}
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

          </div>
        );
      })()}

      {/* Mobile Bottom Bar (Hidden on landing & test) */}
      {currentStep !== 'test' && currentStep !== 'landing' && (
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
      {paymentSubject && (
        <PaymentModal
          subject={paymentSubject}
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
