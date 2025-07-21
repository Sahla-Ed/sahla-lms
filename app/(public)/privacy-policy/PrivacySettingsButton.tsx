'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export function PrivacySettingsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size='lg' className='group' onClick={() => setOpen(true)}>
        Privacy Settings
        <Settings className='ml-2 h-4 w-4 transition-transform group-hover:rotate-90' />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
          </DialogHeader>
          <div className='text-muted-foreground py-4 text-center'>
            <p className='mb-2 text-lg font-semibold'>Coming Soon!</p>
            <p>
              We are working on giving you more control over your data. Stay
              tuned for updates.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className='w-full'>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
