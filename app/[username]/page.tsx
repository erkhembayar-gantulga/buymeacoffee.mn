import Image from 'next/image'
import Header from "@/components/header"
import SupportForm from '../../components/support-form'
import CommentsList from '../../components/comments-list'

interface CreatorProfileProps {
  params: { username: string }
}

interface CreatorData {
  username: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

async function fetchCreatorData(username: string): Promise<CreatorData> {
  // Simulating API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data based on username
  const mockData: Record<string, CreatorData> = {
    johndoe: {
      username: 'johndoe',
      bio: 'Passionate photographer capturing the beauty of Mongolia. Join me on my visual journey through this stunning country!',
      profileImage: '/images/johndoe-profile.jpg',
      socialLinks: {
        instagram: 'https://instagram.com/johndoe_photos',
        twitter: 'https://twitter.com/johndoe_photos'
      }
    },
    sarahsmith: {
      username: 'sarahsmith',
      bio: 'Nomadic lifestyle blogger exploring the traditions of Mongolia. Let\'s discover the hidden gems together!',
      profileImage: '/images/sarahsmith-profile.jpg',
      socialLinks: {
        youtube: 'https://youtube.com/c/sarahsmithtravels',
        instagram: 'https://instagram.com/sarah_travels'
      }
    }
  };

  // Return mock data if exists, otherwise return default data
  return mockData[username] || {
    username,
    bio: `${username} is a creator based in Mongolia. Support their work!`,
    profileImage: '/images/default-profile.jpg',
    socialLinks: {}
  };
}

export default async function CreatorProfile({ params }: CreatorProfileProps) {
  const { username } = params
  const creatorData = await fetchCreatorData(username)

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLoginButton={false} />

      <main className="flex-grow flex flex-col md:flex-row p-4 gap-8">
        {/* Left column: Profile Image and About */}
        <div className="md:w-1/3">
          <div className="mb-4">
            <Image
              src={creatorData.profileImage}
              alt={`${username}'s profile`}
              width={300}
              height={300}
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">About</h2>
            <p className="mb-4">{creatorData.bio}</p>
            <div className="flex gap-4">
              {Object.entries(creatorData.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {/* Add social icons here */}
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Support form and Comments */}
        <div className="md:w-2/3">
          <SupportForm username={username} />
          <CommentsList username={username} />
        </div>
      </main>
    </div>
  )
}
