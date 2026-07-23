import React, { createContext, useContext, useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { SERVICES } from '../data/servicesData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { TESTIMONIALS, TestimonialItem } from '../data/testimonialsData';
import { FAQ_ITEMS } from '../data/faqData';
import { TEAM_MEMBERS, CULTURE_CARDS, TEAM_STATISTICS, TeamMember, CultureCard, TeamStatistic } from '../data/teamData';
import { ServiceItem, PortfolioProject } from '../types';

interface CMSContextType {
  company: typeof COMPANY_INFO;
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  testimonials: TestimonialItem[];
  faqs: typeof FAQ_ITEMS;
  teamMembers: TeamMember[];
  cultureCards: CultureCard[];
  teamStats: TeamStatistic[];
  isSupabaseConnected: boolean;
  updateCompanyData: (newData: Partial<typeof COMPANY_INFO>) => void;
  updateServicePrice: (serviceId: string, inrPrice: number, usdPrice?: number) => void;
  updateTeamMember: (id: string, memberData: Partial<TeamMember>) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompany] = useState(COMPANY_INFO);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [portfolio] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);
  const [testimonials] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [faqs] = useState(FAQ_ITEMS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [cultureCards] = useState<CultureCard[]>(CULTURE_CARDS);
  const [teamStats] = useState<TeamStatistic[]>(TEAM_STATISTICS);
  const isSupabaseConnected = false; // Prepared for future Supabase client binding

  const updateCompanyData = (newData: Partial<typeof COMPANY_INFO>) => {
    setCompany((prev) => ({ ...prev, ...newData }));
  };

  const updateServicePrice = (serviceId: string, inrPrice: number, usdPrice?: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              offerPriceINR: inrPrice,
              offerPriceUSD: usdPrice ?? s.offerPriceUSD,
              inrStartingPrice: inrPrice,
              usdStartingPrice: usdPrice ?? s.usdStartingPrice,
            }
          : s
      )
    );
  };

  const updateTeamMember = (id: string, memberData: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...memberData } : m))
    );
  };

  return (
    <CMSContext.Provider
      value={{
        company,
        services,
        portfolio,
        testimonials,
        faqs,
        teamMembers,
        cultureCards,
        teamStats,
        isSupabaseConnected,
        updateCompanyData,
        updateServicePrice,
        updateTeamMember,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
