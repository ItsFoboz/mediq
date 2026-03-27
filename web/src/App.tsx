import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import AppLayout from '@/components/layout/AppLayout'
import ProLayout from '@/components/layout/ProLayout'

// Public pages
import HomePage from '@/pages/HomePage'
import SearchPage from '@/pages/SearchPage'
import DoctorProfilePage from '@/pages/DoctorProfilePage'
import ClinicsPage from '@/pages/ClinicsPage'
import ClinicProfilePage from '@/pages/ClinicProfilePage'
import SpecialtiesPage from '@/pages/SpecialtiesPage'
import SpecialtyPage from '@/pages/SpecialtyPage'
import CityPage from '@/pages/CityPage'
import SymptomCheckerPage from '@/pages/SymptomCheckerPage'
import PharmaciesPage from '@/pages/PharmaciesPage'
import GuidePage from '@/pages/GuidePage'
import GuideArticlePage from '@/pages/GuideArticlePage'
import PlusPage from '@/pages/PlusPage'
import ForDoctorsPage from '@/pages/ForDoctorsPage'
import FaqPage from '@/pages/FaqPage'
import ContactPage from '@/pages/ContactPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Authenticated pages
import BookingPage from '@/pages/BookingPage'
import ProfilePage from '@/pages/ProfilePage'
import AppointmentsPage from '@/pages/AppointmentsPage'
import WaitingListPage from '@/pages/WaitingListPage'
import FavoritesPage from '@/pages/FavoritesPage'
import SettingsPage from '@/pages/SettingsPage'

// Pro portal pages
import ProLoginPage from '@/pages/pro/ProLoginPage'
import ProDashboardPage from '@/pages/pro/ProDashboardPage'
import ProCalendarPage from '@/pages/pro/ProCalendarPage'
import ProPatientsPage from '@/pages/pro/ProPatientsPage'
import ProProfilePage from '@/pages/pro/ProProfilePage'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Pro portal — standalone layout */}
          <Route path="/pro/login" element={<ProLoginPage />} />
          <Route path="/pro" element={<ProLayout />}>
            <Route path="dashboard" element={<ProDashboardPage />} />
            <Route path="calendar" element={<ProCalendarPage />} />
            <Route path="patients" element={<ProPatientsPage />} />
            <Route path="profile" element={<ProProfilePage />} />
          </Route>

          {/* Public routes — AppLayout with Header + Footer */}
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="doctors" element={<SearchPage />} />
            <Route path="doctors/:slug" element={<DoctorProfilePage />} />
            <Route path="clinics" element={<ClinicsPage />} />
            <Route path="clinics/:slug" element={<ClinicProfilePage />} />
            <Route path="specialties" element={<SpecialtiesPage />} />
            <Route path="specialties/:slug" element={<SpecialtyPage />} />
            <Route path="cities/:slug" element={<CityPage />} />
            <Route path="symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="pharmacies" element={<PharmaciesPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="guide/:slug" element={<GuideArticlePage />} />
            <Route path="plus" element={<PlusPage />} />
            <Route path="for-doctors" element={<ForDoctorsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />

            {/* Auth-required (guard inside component) */}
            <Route path="book/:id" element={<BookingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="waiting-list" element={<WaitingListPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="settings" element={<SettingsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
