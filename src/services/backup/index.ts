export const BackupService = {
  createLocalBackup: async (): Promise<string> => {
    console.log('[BackupService] stub — create local backup');
    return 'backup_id_stub';
  },
  restoreBackup: async (backupId: string): Promise<boolean> => {
    console.log('[BackupService] stub — restore', backupId);
    return true;
  },
};
