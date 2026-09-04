"use client";

import React, { useState } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";
import { DonationModal } from "@/components/common/DonationModal";

interface PublicLayoutProps {
  children: React.ReactNode;
  showAnnouncement?: boolean;
  announcementMessage?: string;
  activePath?: string;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  showAnnouncement = true,
  announcementMessage,
  activePath = "/",
}) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [designatedProject, setDesignatedProject] = useState("All Foundation Initiatives");

  const handleOpenDonate = (project?: string) => {
    setDesignatedProject(project || "All Foundation Initiatives");
    setIsDonationModalOpen(true);
  };

  const handleCloseDonate = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Optional Emergency Announcement Bar */}
      {showAnnouncement && (
        <AnnouncementBanner
          message={announcementMessage}
          onActionClick={() => handleOpenDonate("Emergency Healthcare & Ambulance")}
        />
      )}

      {/* 2. Sticky Glassmorphic Header */}
      <PublicHeader
        onOpenDonateModal={() => handleOpenDonate()}
        activeHref={activePath}
      />

      {/* 3. Main Page Content */}
      <main className="flex-1 focus:outline-none" id="main-content">
        {children}
      </main>

      {/* 4. Rich Public Footer */}
      <PublicFooter onOpenDonateModal={() => handleOpenDonate()} />

      {/* 5. Global Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={handleCloseDonate}
        defaultProject={designatedProject}
      />
    </div>
  );
};

export default PublicLayout;
