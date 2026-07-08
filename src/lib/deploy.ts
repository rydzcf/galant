/**
 * Interfejs dla opcji konfiguracji przycisku i powiadomień
 */
interface DeployOptions {
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onFinal?: () => void;
}

/**
 * Uniwersalna funkcja do odpalania deploya na GitHubie.
 * Zwalnia Cię z pisania logiki w komponencie buttona.
 * 
 * @param token - Twój Fine-grained Personal Access Token z GitHuba
 * @param repoUrl - Link do dispatches, np. "https://api.github.com/repos/PROFIL/REPO/dispatches"
 * @param options - Opcjonalne callbacki do obsługi UI (ładowanie, sukces, błąd)
 */
export async function executeDeploy(
  token: string, 
  repoUrl: string, 
  options?: DeployOptions
): Promise<void> {
  
  // 1. Wywołaj callback startowy (np. włączenie spinnera w UI)
  if (options?.onStart) options.onStart();

  try {
    const response = await fetch(repoUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'webhook_deploy'
      })
    });

    // GitHub zwraca status 204 No Content przy udanym wyzwoleniu akcji
    if (response.status === 204) {
      if (options?.onSuccess) options.onSuccess();
    } else {
      const errorMsg = `GitHub zwrócił kod błędu: ${response.status}`;
      if (options?.onError) options.onError(errorMsg);
    }
  } catch (error: any) {
    if (options?.onError) options.onError(error?.message || 'Błąd połączenia sieciowego');
  } finally {
    // 4. Wywołaj końcowy callback (np. wyłączenie spinnera)
    if (options?.onFinal) options.onFinal();
  }
}