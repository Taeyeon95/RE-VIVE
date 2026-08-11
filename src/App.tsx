import { useMemo, useState } from 'react';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { AccessibilityProvider } from './components/layout/AccessibilityProvider';
import { AppHeader } from './components/layout/AppHeader';
import { NavBar, type View } from './components/layout/NavBar';
import { AuthGate } from './components/auth/AuthGate';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { MigratePrompt } from './components/auth/MigratePrompt';
import { HomePage } from './pages/HomePage';
import { StatsPage } from './pages/StatsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { useGoal } from './hooks/useGoal';
import { useCravingEvents } from './hooks/useCravingEvents';
import { createLocalProfileBackend, createCloudProfileBackend } from './storage/profileBackend';
import { createLocalGoalBackend, createCloudGoalBackend } from './storage/goalBackend';
import { createLocalCravingBackend, createCloudCravingBackend } from './storage/cravingBackend';
import { getProfile as getLocalProfile } from './storage/profileStorage';
import { getGoals as getLocalGoals } from './storage/goalStorage';
import { getCravingEvents as getLocalCravingEvents } from './storage/cravingStorage';

const GUEST_MODE_KEY = 'quit-app:guestMode';
const MIGRATION_HANDLED_KEY = 'quit-app:migrationHandled';

type AuthOverlay = 'login' | 'signup' | null;

function LoadingScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-surface text-on-surface-variant">불러오는 중...</div>
  );
}

function App() {
  const { user, authLoading, authError, signUp, logIn, logOut } = useAuth();
  const [guestMode, setGuestMode] = useState(() => localStorage.getItem(GUEST_MODE_KEY) === 'true');
  const [authOverlay, setAuthOverlay] = useState<AuthOverlay>(null);
  const [migrationHandled, setMigrationHandled] = useState(
    () => localStorage.getItem(MIGRATION_HANDLED_KEY) === 'true',
  );
  const [view, setView] = useState<View>('home');

  const profileBackend = useMemo(
    () => (user ? createCloudProfileBackend() : createLocalProfileBackend()),
    [user],
  );
  const goalBackend = useMemo(() => (user ? createCloudGoalBackend() : createLocalGoalBackend()), [user]);
  const cravingBackend = useMemo(
    () => (user ? createCloudCravingBackend() : createLocalCravingBackend()),
    [user],
  );

  const { profile, loading: profileLoading, isOnboarded, saveProfile, updateProfile, resetProfile } =
    useProfile(profileBackend);
  const { activeGoals, achievedGoals, createGoal, editGoal, removeGoal, achieveGoal, resetGoals, importGoals } =
    useGoal(goalBackend);
  const { events, logEvent, removeEvent, resetEvents, importEvents } = useCravingEvents(cravingBackend);

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!user && authOverlay === 'login') {
    return <LoginForm authError={authError} onSubmit={logIn} onBack={() => setAuthOverlay(null)} />;
  }
  if (!user && authOverlay === 'signup') {
    return <SignupForm authError={authError} onSubmit={signUp} onBack={() => setAuthOverlay(null)} />;
  }

  if (!user && !guestMode) {
    return (
      <AuthGate
        authError={authError}
        onGuestContinue={() => {
          localStorage.setItem(GUEST_MODE_KEY, 'true');
          setGuestMode(true);
        }}
        onLogIn={logIn}
        onSignUp={signUp}
      />
    );
  }

  const hasLocalGuestData = getLocalProfile() !== null;
  const markMigrationHandled = () => {
    localStorage.setItem(MIGRATION_HANDLED_KEY, 'true');
    setMigrationHandled(true);
  };

  if (user && !profileLoading && profile === null && hasLocalGuestData && !migrationHandled) {
    return (
      <MigratePrompt
        onMigrate={async () => {
          const localProfile = getLocalProfile();
          if (localProfile) await saveProfile(localProfile);
          await importGoals(getLocalGoals());
          await importEvents(getLocalCravingEvents());
          markMigrationHandled();
        }}
        onSkip={markMigrationHandled}
      />
    );
  }

  if (profileLoading) {
    return <LoadingScreen />;
  }

  if (!isOnboarded || !profile) {
    return (
      <OnboardingWizard
        onComplete={(newProfile, goal) => {
          saveProfile(newProfile);
          createGoal(goal);
        }}
      />
    );
  }

  const handleRestartQuitDate = () => {
    updateProfile({ quitDateTime: new Date().toISOString() });
  };

  const handleResetAll = () => {
    resetProfile();
    resetGoals();
    resetEvents();
    setView('home');
  };

  return (
    <AccessibilityProvider settings={profile.accessibility}>
      <div className="mx-auto min-h-svh max-w-md bg-surface">
        <AppHeader />
        {view === 'home' && (
          <HomePage
            profile={profile}
            activeGoals={activeGoals}
            achievedGoals={achievedGoals}
            events={events}
            logEvent={logEvent}
            achieveGoal={achieveGoal}
            onGoToSettings={() => setView('settings')}
          />
        )}
        {view === 'stats' && (
          <StatsPage
            profile={profile}
            events={events}
            achievedGoals={achievedGoals}
            onDeleteEvent={removeEvent}
          />
        )}
        {view === 'admin' && user?.isAdmin && <AdminPage />}
        {view === 'settings' && (
          <SettingsPage
            profile={profile}
            activeGoals={activeGoals}
            accountEmail={user?.email ?? null}
            onOpenLogin={() => setAuthOverlay('login')}
            onOpenSignup={() => setAuthOverlay('signup')}
            onLogOut={() => logOut()}
            onUpdateProfile={updateProfile}
            onRestartQuitDate={handleRestartQuitDate}
            onUpdateGoal={editGoal}
            onCreateGoal={createGoal}
            onDeleteGoal={removeGoal}
            onUpdateAccessibility={(updates) =>
              updateProfile({ accessibility: { ...profile.accessibility, ...updates } })
            }
            onResetAll={handleResetAll}
          />
        )}
        <NavBar current={view} onNavigate={setView} showAdmin={user?.isAdmin} />
      </div>
    </AccessibilityProvider>
  );
}

export default App;
