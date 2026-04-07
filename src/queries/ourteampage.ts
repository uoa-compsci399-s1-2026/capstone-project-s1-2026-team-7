import { payload } from '@/lib/payload'
import type { OurTeamPage, Staff, Media } from '@/payload-types'
import type { ourteampageDTO, StaffDTO, ImageDTO } from './ourteampageDTO'

type SiteLocale = 'en' | 'zh' | 'mi'

const DEFAULT_PROFILE_PIC: ImageDTO = {
  url: 'https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png',
  alt: 'Default Profile Picture',
}

function requireNonEmptyString(value: string | null | undefined, fieldName: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${fieldName} is missing or empty`)
  }

  return value
}

function isStaffDocument(value: unknown): value is Staff {
  return typeof value === 'object' && value !== null && 'firstname' in value
}

function isMediaDocument(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value
}

function getProfilePic(staff: Staff): ImageDTO {
  if (!staff.photo || typeof staff.photo === 'number') {
    return DEFAULT_PROFILE_PIC
  }

  if (!isMediaDocument(staff.photo)) {
    throw new Error(`Staff member ${staff.firstname} ${staff.lastname} has malformed photo data`)
  }

  if (typeof staff.photo.url !== 'string' || staff.photo.url.trim() === '') {
    return DEFAULT_PROFILE_PIC
  }

  return {
    url: staff.photo.url,
    alt:
      typeof staff.photo.alt === 'string' && staff.photo.alt.trim() !== ''
        ? staff.photo.alt
        : 'Profile Picture',
  }
}

function mapStaffMember(staffMember: Staff): StaffDTO {
  return {
    firstname: requireNonEmptyString(
      staffMember.firstname,
      `Staff firstname for ID ${staffMember.id}`,
    ),
    lastname: requireNonEmptyString(
      staffMember.lastname,
      `Staff lastname for ID ${staffMember.id}`,
    ),
    jobTitle: requireNonEmptyString(
      staffMember.jobTitle,
      `Staff jobTitle for ${staffMember.firstname} ${staffMember.lastname}`,
    ),
    intro: staffMember.intro ?? '',
    manager: staffMember.manager ?? false,
    uoaProfileLink: staffMember.uoaProfileLink ?? '',
    email: staffMember.email ?? '',
    photo: getProfilePic(staffMember),
    sortOrder: staffMember.sortOrder ?? 1000000,
  }
}

export async function getOurTeamPage(locale: SiteLocale = 'en'): Promise<ourteampageDTO> {
  const ourteampage: OurTeamPage = await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  const title = requireNonEmptyString(ourteampage.title, 'Our Team page title')
  const boardTabLabel = requireNonEmptyString(
    ourteampage.boardTabLabel,
    'Our Team page boardTabLabel',
  )
  const staffTabLabel = requireNonEmptyString(
    ourteampage.staffTabLabel,
    'Our Team page staffTabLabel',
  )

  if (!ourteampage.staffMembers || ourteampage.staffMembers.length === 0) {
    throw new Error('Our Team page has no staff members selected')
  }

  const populatedStaffMembers = ourteampage.staffMembers.filter((member): member is Staff =>
    isStaffDocument(member),
  )

  if (populatedStaffMembers.length !== ourteampage.staffMembers.length) {
    throw new Error(
      'Our Team page staffMembers contains unpopulated relationship IDs instead of staff documents',
    )
  }

  const staff = populatedStaffMembers.map(mapStaffMember).sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    title,
    boardTabLabel,
    staffTabLabel,
    staff,
  }
}

/*import { payload } from '@/lib/payload'
import type { OurTeamPage, Staff, Media } from '@/payload-types'
import type { ourteampageDTO, StaffDTO, ImageDTO } from './ourteampageDTO'

type SiteLocale = 'en' | 'zh' | 'mi'

const DEFAULT_PROFILE_PIC: ImageDTO = {
  url: 'https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png',
  alt: 'Default Profile Picture',
}

function requireNonEmptyString(
  value: string | null | undefined,
  fieldName: string,
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${fieldName} is missing or empty`)
  }

  return value
}

function isStaffDocument(value: unknown): value is Staff {
  return typeof value === 'object' && value !== null && 'firstname' in value
}

function isMediaDocument(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value
}

function getProfilePic(staff: Staff): ImageDTO {
  if (!staff.photo || typeof staff.photo === 'number') {
    return DEFAULT_PROFILE_PIC
  }

  if (!isMediaDocument(staff.photo)) {
    throw new Error(
      `Staff member ${staff.firstname} ${staff.lastname} has malformed photo data`,
    )
  }

  if (typeof staff.photo.url !== 'string' || staff.photo.url.trim() === '') {
    return DEFAULT_PROFILE_PIC
  }

  return {
    url: staff.photo.url,
    alt:
      typeof staff.photo.alt === 'string' && staff.photo.alt.trim() !== ''
        ? staff.photo.alt
        : 'Profile Picture',
  }
}

function mapStaffMember(staffMember: Staff): StaffDTO {
  return {
    firstname: requireNonEmptyString(
      staffMember.firstname,
      `Staff firstname for ID ${staffMember.id}`,
    ),
    lastname: requireNonEmptyString(
      staffMember.lastname,
      `Staff lastname for ID ${staffMember.id}`,
    ),
    jobTitle: requireNonEmptyString(
      staffMember.jobTitle,
      `Staff jobTitle for ${staffMember.firstname} ${staffMember.lastname}`,
    ),
    intro: staffMember.intro ?? '',
    manager: staffMember.manager ?? false,
    uoaProfileLink: staffMember.uoaProfileLink ?? '',
    email: staffMember.email ?? '',
    photo: getProfilePic(staffMember),
    sortOrder: staffMember.sortOrder ?? 1000000,
  }
}

export async function getOurTeamPage(
  locale: SiteLocale = 'en',
): Promise<ourteampageDTO> {
  const ourteampage: OurTeamPage = await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  const title = requireNonEmptyString(ourteampage.title, 'Our Team page title')
  const boardTabLabel = requireNonEmptyString(
    ourteampage.boardTabLabel,
    'Our Team page boardTabLabel',
  )
  const staffTabLabel = requireNonEmptyString(
    ourteampage.staffTabLabel,
    'Our Team page staffTabLabel',
  )

  if (!ourteampage.staffMembers || ourteampage.staffMembers.length === 0) {
    throw new Error('Our Team page has no staff members selected')
  }

  const unpopulatedStaff = ourteampage.staffMembers.filter(
    (member) => !isStaffDocument(member),
  )

  if (unpopulatedStaff.length > 0) {
    throw new Error(
      'Our Team page staffMembers contains unpopulated relationship IDs instead of staff documents',
    )
  }

  const staff = ourteampage.staffMembers
    .map(mapStaffMember)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    title,
    boardTabLabel,
    staffTabLabel,
    staff,
  }
}
*/

/*import { payload } from '@/lib/payload'
import { OurTeamPage } from '@/payload-types'
type SiteLocale = 'en' | 'zh' | 'mi'
import { Staff } from '@/payload-types'

import { ourteampageDTO, StaffDTO, ImageDTO } from './ourteampageDTO'

export async function getOurTeamPage(locale: SiteLocale = 'en') {
  return await payload
    .findGlobal({
      slug: 'our-team-page',
      locale,
      fallbackLocale: 'en',
      depth: 1,
    })
    .then((ourteampage: OurTeamPage) => {
        if (ourteampage.staffMembers){
            if (ourteampage.staffMembers.length > 0){
                if (typeof ourteampage.staffMembers[0] !== "number"){
                    const staff: StaffDTO[] = ourteampage.staffMembers.map((staff: Staff) => {
                        let profilePic: ImageDTO 
                        if (staff.photo){
                            if (typeof staff.photo !== "number"){
                                if (typeof staff.photo.url === "string"){
                                    profilePic = {
                                        url:  staff.photo.url,
                                        alt: staff.photo.alt
                                    }    
                                }
                                else{
                                    profilePic = {
                                        url : "https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png",  
                                        alt : "Default Profile Picture"
                                    }
                                }
                                     
                            }
                            else{
                                    profilePic = {
                                        url : "https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png",  
                                        alt : "Default Profile Picture"
                                    }
                            }
                        }
                        else{
                            profilePic = {
                                url : "https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png",  
                                alt : "Default Profile Picture"
                            }
                        }

                        return {
                            firstname: staff.firstname,
                            lastname: staff.lastname,
                            jobTitle: staff.jobTitle,
                            intro: staff.intro || "",
                            manager: staff.manager,
                            uoaProfileLink: staff.uoaProfileLink,
                            email: staff.email,
                            photo: profilePic,
                            sortOrder: staff.sortOrder || 1000000
                        }
                    })
                } 
            }
            else {
                throw Error("There are numbers being passed instead of media, or there are no staff members") 
            }
        }

        else{
            throw Error("There are no Staff Members being passed to the OurTeamGlobal") 
        }


        
    })
}
*/
