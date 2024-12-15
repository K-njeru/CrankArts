import { Anchor, Zap, Users, Building2 } from 'lucide-react';

type ServiceItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white shadow-lg border-t-4 border-orange-500 rounded-lg transform hover:scale-105 hover:bg-gradient-to-br hover:from-orange-100 hover:to-white transition-transform duration-300">
    <div className="text-6xl mb-6">{icon}</div>
    <h3 className="text-3xl font-semibold mb-4 text-orange-600">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Services() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-orange-50 via-white to-orange-50 w-full overflow-hidden" id='services'>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-16">
          Our Signature Services
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ServiceItem
            icon={<Anchor className="text-orange-500" />}
            title="Tattooing"
            description="Our professional tattoo artists are skilled in a wide variety of styles, from intricate black-and-grey realism to colorful neo-traditional art. We ensure that every line is perfect and every color is vibrant, creating a piece you'll be proud to wear for life."
          />
          <ServiceItem
            icon={<Zap className="text-orange-500" />}
            title="Piercing"
            description="With top-of-the-line sterilization and high-quality jewelry, our piercing specialists create stunning and safe piercings for any part of your body. From classic ear piercings to bold septum and industrial styles."
          />
          <ServiceItem
            icon={<Users className="text-orange-500" />}
            title="Canvas Designs"
            description="Collaborate with our experienced artists to bring your vision to life. Every canvas design is a story waiting to be told, making your tattoo a true work of art."
          />
          <ServiceItem
            icon={<Building2 className="text-orange-500" />}
            title="Wall Art"
            description="Transform your space with captivating wall art designed by our in-house artists. We specialize in everything from graffiti murals to elegant, hand-painted accents."
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-orange-100" style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }}></div>
    </section>
  );
}