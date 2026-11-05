import React, { useState } from 'react';
import { useGame } from './store/useGameStore';
import { StageBackground } from './components/stage/StageBackground';
import { TopLeftPresents } from './components/stage/TopLeftPresents';
import { ShowLogo } from './components/stage/ShowLogo';
import { VolumeMeter } from './components/volume/VolumeMeter';
import { Contestant } from './components/stage/Contestant';
import { ComicInputBubble } from './components/gameplay/ComicInputBubble';
import { JudgePanel } from './components/judges/JudgePanel';
import { Audience } from './components/stage/Audience';
import { BottomBar } from './components/controls/BottomBar';
import { AverageReveal } from './components/gameplay/AverageReveal';
import { ResultOverlay } from './components/gameplay/ResultOverlay';
import { StartCurtain } from './components/stage/StartCurtain';
import { StatisticsModal } from './components/modals/StatisticsModal';
import { AchievementsModal } from './components/modals/AchievementsModal';
import { SoundSettingsModal } from './components/modals/SoundSettingsModal';
import { GeneralSettingsModal } from './components/modals/GeneralSettingsModal';
import { HowToPlayModal } from './components/modals/HowToPlayModal';

export default function App() {
  const {
    showStarted,
    startShow,
    round,
    attempt,
    currentVolume,
    phase,
    contestantGuess,
    inputVal,
    setInputVal,
    inputError,
    setInputError,
    judgeScores,
    revealedCount,
    activeJudgeIndex,
    activeSpeech,
    calculatedAverage,
    isMatch,
    submitScore,
    nextAttempt,
    stats,
    achievements,
    activeModal,
    setActiveModal,
    audioSettings,
    updateAudioSettings,
    toggleMute,
    toleranceTenths,
    setToleranceTenths,
    fastMode,
    setFastMode,
  } = useGame();

  const isJudging = phase === 'JUDGING' || phase === 'COUNTDOWN';
  const isCelebrating = isMatch === true;
  const isDisappointed = isMatch === false;

  const handleResetData = () => {
    localStorage.removeItem('cis_got_latent_stats');
    localStorage.removeItem('cis_got_latent_achievements');
    localStorage.removeItem('cis_got_latent_volume');
    window.location.reload();
  };

  return (
    <main className="relative w-screen h-screen min-h-[640px] bg-black text-white overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Theatrical Stage Background */}
      <StageBackground phase={phase} isMatch={isMatch} />

      {/* Start Show Curtain Entrance */}
      <StartCurtain showStarted={showStarted} onStart={startShow} />

      {/* ================= TOP BAR HEADER ================= */}
      <header className="relative w-full px-3 sm:px-6 pt-3 sm:pt-4 flex items-center justify-between z-40 pointer-events-auto">
        {/* Top-Left: IEEE CIS KLS GIT Presents */}
        <div className="w-1/4 min-w-[140px] flex items-center">
          <TopLeftPresents />
        </div>

        {/* Top-Center: CIS GOT LATENT Illustrated Logo */}
        <div className="flex-1 flex justify-center">
          <ShowLogo />
        </div>

        {/* Top-Right: Current Volume Panel */}
        <div className="w-1/4 min-w-[140px] flex justify-end">
          <VolumeMeter volume={currentVolume} />
        </div>
      </header>

      {/* ================= MAIN STAGE AREA ================= */}
      <section className="relative flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 flex flex-col lg:flex-row items-center lg:items-end justify-between z-30 pb-4 pt-1 sm:pt-2">
        {/* LEFT COLUMN: Contestant silhouette & Comic Speech Bubble directly beside face */}
        <div className="relative flex items-center lg:items-end justify-center lg:justify-start gap-1 sm:gap-3 w-full lg:w-auto shrink-0 mb-4 lg:mb-0">
          {/* Contestant Silhouette */}
          <Contestant
            isSpeaking={phase === 'COUNTDOWN'}
            isCelebrating={isCelebrating}
            isDisappointed={isDisappointed}
          />

          {/* Comic Speech-Bubble Input (Positioned directly beside contestant's face/chest!) */}
          <div className="translate-y-[-20px] sm:translate-y-[-40px]">
            <ComicInputBubble
              inputVal={inputVal}
              setInputVal={setInputVal}
              onSubmit={submitScore}
              isDisabled={isJudging || phase === 'AVERAGE_REVEAL' || phase === 'RESULT'}
              phase={phase}
              error={inputError}
              setError={setInputError}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: The 5 Judges Seated behind Illuminated Table */}
        <div className="relative flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
          <JudgePanel
            judgeScores={judgeScores}
            revealedCount={revealedCount}
            activeJudgeIndex={activeJudgeIndex}
            activeSpeech={activeSpeech}
          />
        </div>
      </section>

      {/* ================= FOREGROUND AUDIENCE SILHOUETTE ================= */}
      <Audience isCheering={isCelebrating} isLaughing={isDisappointed} />

      {/* ================= BOTTOM BAR CONTROLS ================= */}
      <footer className="relative w-full z-40">
        <BottomBar
          round={round}
          attempt={attempt}
          isMuted={audioSettings.muted}
          onOpenStats={() => setActiveModal('stats')}
          onOpenAchievements={() => setActiveModal('achievements')}
          onOpenSound={() => setActiveModal('sound')}
          onOpenSettings={() => setActiveModal('settings')}
          onOpenHelp={() => setActiveModal('instructions')}
        />
      </footer>

      {/* ================= DRAMATIC OVERLAYS & MODALS ================= */}
      {/* 1. Dramatic Average Reveal Banner */}
      {phase === 'AVERAGE_REVEAL' && calculatedAverage !== null && (
        <AverageReveal average={calculatedAverage} />
      )}

      {/* 2. Result Overlay (Celebration or Funny Failure) */}
      {phase === 'RESULT' && isMatch !== null && contestantGuess !== null && calculatedAverage !== null && (
        <ResultOverlay
          isMatch={isMatch}
          guess={contestantGuess}
          average={calculatedAverage}
          onNext={nextAttempt}
        />
      )}

      {/* 3. Statistics Modal */}
      {activeModal === 'stats' && (
        <StatisticsModal
          stats={stats}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 4. Achievements & Leaderboard Modal */}
      {activeModal === 'achievements' && (
        <AchievementsModal
          achievements={achievements}
          currentVolume={currentVolume}
          totalWins={stats.totalWins}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 5. Sound Settings Modal */}
      {activeModal === 'sound' && (
        <SoundSettingsModal
          settings={audioSettings}
          onUpdate={updateAudioSettings}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 6. General Gameplay Settings Modal */}
      {activeModal === 'settings' && (
        <GeneralSettingsModal
          toleranceTenths={toleranceTenths}
          setToleranceTenths={setToleranceTenths}
          fastMode={fastMode}
          setFastMode={setFastMode}
          onResetData={handleResetData}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 7. How to Play Modal */}
      {activeModal === 'instructions' && (
        <HowToPlayModal
          onClose={() => setActiveModal(null)}
        />
      )}
    </main>
  );
}
