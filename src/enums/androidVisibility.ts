export enum AndroidVisibility {
  //  Public (default) (Shows the full message on the lock screen unless the user has disabled all notifications from showing on the lock screen.
  //  Please consider the user and mark private if the contents are.)
  Public = 1,
  // Private (Hides message contents on lock screen if the user set "Hide sensitive notification content" in the system settings)
  Private = 1,
  // Secret (Notification does not show on the lock screen at all)
  Secret = -1,
}
