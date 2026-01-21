import type { Metadata } from 'next'
import { Edit, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { messages } from '@/lib/messages'
import { OrganizationView } from './organization-view'

export const metadata: Metadata = {
  title: messages.ORGANIZATION.SINGLE_TITLE,
  description: messages.ORGANIZATION.VIEW_DESCRIPTION,
}

const fetchOrganization = async (id: string) => {
  // In a real app, this would be an API call
  return {
    id,
    slug: 'innovate-global-solutions',
    image: '/placeholder.svg?height=150&width=150',
    title: 'Innovate Global Solutions Inc.',
    description:
      'A pioneering force in sustainable technology and consulting, committed to shaping a better future through innovation.',
    coverImage: '/placeholder.svg?height=400&width=1200',
    primaryEmail: 'info@innovateglobal.com',
    secondaryEmail: 'support@innovateglobal.com',
    phoneNumber: '+1 (800) 555-0123',
    faxNumber: '+1 (800) 555-0124',
    missionStatement:
      'To empower organizations worldwide with sustainable and transformative technology solutions that drive growth and positive impact.',
    visionStatement:
      'To be the recognized global leader in sustainable innovation, fostering a future where technology benefits all.',
    foundedYear: 2008,
    timezone: 'Europe/London',
    language: 'en-GB',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    isActive: true,
    isVerified: true,
    isPublic: true,
    statusId: 'active-client',
    categoryId: 'technology-consulting',
    typeId: 'corporation',
    industryId: 'sustainable-tech',
    organizationSizeId: 'large-enterprise',
    website: 'https://www.innovateglobal.com',
    tagline: 'Innovate. Sustain. Transform.',
    employeeCount: 2500,
    annualRevenue: '$500M+',
    certifications: ['ISO 9001', 'ISO 14001', 'B Corp Certified'],
    keyTechnologies: ['AI', 'Machine Learning', 'Cloud Computing', 'Blockchain', 'IoT'],
    productsAndServices: [
      {
        id: 'service-1',
        name: 'Sustainability Consulting',
        description: 'Expert advice on environmental and social responsibility.',
      },
      {
        id: 'product-1',
        name: 'AI-Powered Analytics Platform',
        description: 'Advanced data analysis for business insights.',
      },
    ],
    socialLinks: [
      {
        id: 'social-1',
        platform: 'Twitter',
        url: 'https://twitter.com/innovateglobal',
        title: 'Innovate Global Twitter',
        icon: 'twitter',
      },
      {
        id: 'social-2',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/innovate-global-solutions',
        title: 'Innovate Global LinkedIn',
        icon: 'linkedin',
      },
      {
        id: 'social-3',
        platform: 'Facebook',
        url: 'https://facebook.com/innovateglobalsolutions',
        title: 'Innovate Global Facebook',
        icon: 'facebook',
      },
      {
        id: 'social-4',
        platform: 'Instagram',
        url: 'https://instagram.com/innovateglobalsolutions',
        title: 'Innovate Global Instagram',
        icon: 'instagram',
      },
      {
        id: 'social-5',
        platform: 'YouTube',
        url: 'https://youtube.com/c/innovateglobalsolutions',
        title: 'Innovate Global YouTube',
        icon: 'youtube',
      },
    ],
    addresses: [
      {
        id: 'address-1',
        title: 'Global Headquarters',
        addressLine1: '10 Downing Street',
        addressLine2: 'Suite 100',
        city: 'London',
        state: 'Greater London',
        postalCode: 'SW1A 2AA',
        country: 'United Kingdom',
        isPrimary: true,
        typeId: 'headquarters',
        latitude: 51.503399,
        longitude: -0.127647,
      },
      {
        id: 'address-2',
        title: 'North American Office',
        addressLine1: '45 Rockefeller Plaza',
        addressLine2: 'Floor 20',
        city: 'New York',
        state: 'NY',
        postalCode: '10111',
        country: 'USA',
        isPrimary: false,
        typeId: 'regional-office',
        latitude: 40.758,
        longitude: -73.9788,
      },
    ],
    contactPersons: [
      {
        id: 'contact-1',
        name: 'Alice Smith',
        position: 'CEO',
        email: 'alice.smith@innovateglobal.com',
        phoneNumber: '+1 (800) 555-0125',
      },
      {
        id: 'contact-2',
        name: 'Bob Johnson',
        position: 'Head of Partnerships',
        email: 'bob.johnson@innovateglobal.com',
        phoneNumber: '+1 (800) 555-0126',
      },
    ],
    partners: [
      {
        id: 'partner-1',
        name: 'Global Environmental Trust',
        type: 'Non-profit',
      },
      {
        id: 'partner-2',
        name: 'Tech Innovations Ltd.',
        type: 'Technology Provider',
      },
    ],
    awards: [
      {
        id: 'award-1',
        name: 'Sustainable Business Award 2023',
        year: 2023,
        issuingBody: 'Environmental Leadership Council',
      },
    ],
    pressMentions: [
      {
        id: 'mention-1',
        publication: 'Forbes',
        title: 'Innovate Global Solutions Leading the Way in Green Tech',
        url: 'https://www.forbes.com/...',
        date: '2024-01-15',
      },
    ],
    caseStudies: [
      {
        id: 'case-study-1',
        title: 'Transforming Supply Chain Sustainability for Acme Corp.',
        description: 'How Innovate Global Solutions helped Acme Corp. achieve a more sustainable supply chain.',
        url: '/case-studies/acme-corp',
      },
    ],
    financials: {
      fiscalYearEnd: 'December 31',
      currency: 'EUR',
      revenueHistory: [
        { year: 2021, revenue: 350000000 },
        { year: 2022, revenue: 420000000 },
        { year: 2023, revenue: 510000000 },
      ],
    },
    technologiesUsed: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
    companyValues: ['Innovation', 'Sustainability', 'Integrity', 'Collaboration', 'Customer Focus'],
    officeHours: [
      { day: 'Monday', open: '09:00', close: '17:00' },
      { day: 'Tuesday', open: '09:00', close: '17:00' },
      { day: 'Wednesday', open: '09:00', close: '17:00' },
      { day: 'Thursday', open: '09:00', close: '17:00' },
      { day: 'Friday', open: '09:00', close: '17:00' },
    ],
    legalInformation: {
      registrationNumber: 'UK123456789',
      vatNumber: 'GB987654321',
      legalStructure: 'Public Limited Company (PLC)',
    },
    brandingGuidelines: {
      primaryColor: '#007BFF',
      secondaryColor: '#28A745',
      logoUsage: 'Guidelines for using the company logo.',
    },
  }
}

export default async function OrganizationViewPage({ params }: { params: { id: string } }) {
  const organization = await fetchOrganization(params.id)

  const organizationWithRelations = {
    ...organization,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    createdByUserId: 'system', // or get from auth context if available
  }

  return <OrganizationView organization={organizationWithRelations} />
}
