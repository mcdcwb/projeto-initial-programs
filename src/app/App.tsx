import { useState, useEffect } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { Button } from './components/ui/button';
import { Download, CheckCircle2, Sparkles, Moon, Sun, Linkedin, Github } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  url: string;
}

interface Category {
  title: string;
  programs: Program[];
  subcategories?: Subcategory[];
}

interface Subcategory {
  title: string;
  programs: Program[];
}

export default function App() {
  const [selectedPrograms, setSelectedPrograms] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const categories: Category[] = [
    {
      title: 'Navegadores',
      programs: [
        { id: 'chrome', name: 'Google Chrome', url: 'https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BF6ED2057-C903-14DE-A02F-117D10BA36C4%7D%26lang%3Dpt-BR%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3D-arch_x64-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe' },
        { id: 'firefox', name: 'Mozilla Firefox', url: 'https://download.mozilla.org/?product=firefox-stub&os=win&lang=pt-BR&attribution_code=c291cmNlPWxvY2FsaG9zdDo1MTc1Jm1lZGl1bT1yZWZlcnJhbCZjYW1wYWlnbj0obm90IHNldCkmY29udGVudD0obm90IHNldCkmZXhwZXJpbWVudD0obm90IHNldCkmdmFyaWF0aW9uPShub3Qgc2V0KSZ1YT1jaHJvbWUmY2xpZW50X2lkX2dhND0zMDYwOTg0LjE3ODAyNzMzODMmc2Vzc2lvbl9pZD03NzMyNjAyOTQ0JmRsc291cmNlPWZ4ZG90Y29t&attribution_sig=bb04cb243de21508cdde0e8fa99a383da69260c079b012b12dee78f791435d24' },
        { id: 'brave', name: 'Brave Browser', url: 'https://laptop-updates.brave.com/download/BRV040?bitness=64' },
        { id: 'edge', name: 'Microsoft Edge', url: 'microsoft-edge:https://www.microsoft.com/edge?int=03&form=MA13FJ&pl=launch' },
      ],
    },
    {
      title: 'Comunicação',
      programs: [
        { id: 'discord', name: 'Discord', url: 'https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64' },
        { id: 'teams', name: 'Microsoft Teams', url: 'https://statics.teams.cdn.office.net/production-windows-x86/lkg/MSTeamsSetup.exe' },
      ],
    },
    {
      title: 'Produtividade',
      programs: [
        { id: 'winrar', name: 'WinRAR', url: 'https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-722br.exe' },
        { id: 'notion', name: 'Notion', url: 'https://desktop-release.notion-static.com/Notion%20Setup%207.19.0.exe' },
        { id: 'spotify', name: 'Spotify', url: 'https://download.scdn.co/SpotifySetup.exe' },
        { id: '7zip', name: '7-Zip', url: 'https://github.com/ip7z/7zip/releases/download/26.01/7z2601-x64.exe' },
      ],
    },
    {
      title: 'Plataformas de jogos',
      programs: [
        { id: 'steam', name: 'Steam', url: 'https://cdn.fastly.steamstatic.com/client/installer/SteamSetup.exe' },
        { id: 'epicgames', name: 'Epic Games', url: 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.exe?trackingId=2adb2d3d4389495d9b4eff31b066af7d' },
        { id: 'eagames', name: 'EA Games', url: 'https://origin-a.akamaihd.net/EA-Desktop-Client-Download/installer-releases/EAappInstaller.exe' },

      ],
    }
  ];

  const allPrograms = categories.flatMap((cat) =>
    cat.programs
      ? cat.programs
      : cat.subcategories?.flatMap((sub) => sub.programs) || []
  );

  const toggleProgram = (id: string) => {
    setSelectedPrograms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const actualSelectedCount = Array.from(selectedPrograms).filter(id => id !== 'select-all').length;

  const toggleAll = () => {
    if (actualSelectedCount === allPrograms.length) {
      setSelectedPrograms(new Set());
    } else {
      setSelectedPrograms(new Set(allPrograms.map((p) => p.id)));
    }
  };

  const toggleCategory = (programs: Program[]) => {
    const categoryIds = programs.map((p) => p.id);
    const allSelectedInCategory = categoryIds.every((id) => selectedPrograms.has(id));

    setSelectedPrograms((prev) => {
      const newSet = new Set(prev);
      categoryIds.forEach((id) => {
        if (allSelectedInCategory) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      });
      return newSet;
    });
  };

  const handleDownload = () => {
    const selectedUrls = allPrograms
      .filter((p) => selectedPrograms.has(p.id))
      .map((p) => p.url);

    if (selectedUrls.length === 0) {
      alert('Selecione pelo menos um programa para baixar!');
      return;
    }

    selectedUrls.forEach((url) => {
      window.open(url, '_blank');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 shadow-2xl relative overflow-hidden dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-6 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-300" />
          ) : (
            <Moon className="h-6 w-6 text-blue-100" />
          )}
        </button>

        <div className="container mx-auto px-6 py-10 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="h-8 w-8 text-yellow-300" />
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center tracking-tight">
              Initial Programs
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-300" />
          </div>
          <p className="text-blue-100 text-center mt-2 text-lg md:text-xl">
            Selecione e baixe seus programas favoritos de uma só vez!
          </p>

          {/* Stats badge */}
          <div className="flex justify-center mt-6 h-10">
            {actualSelectedCount > 0 && (
              <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full px-6 py-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span className="text-white font-semibold">
                  {actualSelectedCount} programa{actualSelectedCount !== 1 ? 's' : ''} selecionado{actualSelectedCount !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
        {/* Select All */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-300 hover:shadow-xl transition-all duration-300 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600">
          <div className="flex items-center gap-4 cursor-pointer" onClick={toggleAll}>
            <Checkbox
              id="select-all"
              checked={actualSelectedCount === allPrograms.length}
              onCheckedChange={toggleAll}
              className="h-6 w-6"
            />
            <label
              className="text-lg font-bold text-slate-800 cursor-pointer select-none flex-1 dark:text-white"
            >
              {actualSelectedCount === allPrograms.length ? '✓ ' : ''}Selecionar Todos
            </label>
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold text-sm pointer-events-none">
              {Array.from(selectedPrograms).filter(id => id !== 'select-all').length}/{allPrograms.length}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category, idx) => {
            const categoryPrograms = category.programs
              ? category.programs
              : category.subcategories?.flatMap((sub) => sub.programs) || [];
            const selectedInCategory = categoryPrograms.filter((p) =>
              selectedPrograms.has(p.id)
            ).length;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500"
              >
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400" onClick={() => toggleCategory(categoryPrograms)}>
                    <div className="h-1.5 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    {category.title}
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-4 py-1 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors dark:from-slate-700 dark:to-slate-600 dark:border-slate-500" onClick={() => toggleCategory(categoryPrograms)}>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {selectedInCategory}/{categoryPrograms.length} selecionados
                    </span>
                  </div>
                </div>

                {category.programs ? (
                  <div className="grid gap-3">
                    {category.programs.map((program) => (
                      <div
                        key={program.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-2 border-transparent hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                        onClick={() => toggleProgram(program.id)}
                      >
                        <Checkbox
                          id={program.id}
                          checked={selectedPrograms.has(program.id)}
                          onCheckedChange={() => toggleProgram(program.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-5 w-5"
                        />
                        <label
                          className="text-slate-700 cursor-pointer select-none flex-1 font-medium group-hover:text-blue-700 transition-colors dark:text-slate-200 dark:group-hover:text-blue-400"
                        >
                          {program.name}
                        </label>
                        {selectedPrograms.has(program.id) && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-200" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {category.subcategories?.map((subcategory, subIdx) => (
                      <div key={subIdx}>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3 ml-4">
                          {subcategory.title}
                        </h3>
                        <div className="grid gap-3 ml-4">
                          {subcategory.programs.map((program) => (
                            <div
                              key={program.id}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-2 border-transparent hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                              onClick={() => toggleProgram(program.id)}
                            >
                              <Checkbox
                                id={program.id}
                                checked={selectedPrograms.has(program.id)}
                                onCheckedChange={() => toggleProgram(program.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="h-5 w-5"
                              />
                              <label
                                className="text-slate-700 cursor-pointer select-none flex-1 font-medium group-hover:text-blue-700 transition-colors dark:text-slate-200 dark:group-hover:text-blue-400"
                              >
                                {program.name}
                              </label>
                              {selectedPrograms.has(program.id) && (
                                <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-200" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Download Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="relative">
            {actualSelectedCount > 0 && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-50 animate-pulse"></div>
            )}
            <Button
              onClick={handleDownload}
              disabled={actualSelectedCount === 0}
              size="lg"
              className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar {actualSelectedCount > 0 ? `${actualSelectedCount} ` : ''}Programa{actualSelectedCount !== 1 ? 's' : ''}{actualSelectedCount > 0 ? ' Selecionado' : 's Selecionados'}{actualSelectedCount !== 1 && actualSelectedCount > 0 ? 's' : ''}
            </Button>
          </div>

          {actualSelectedCount === 0 ? (
            <p className="text-slate-500 text-sm italic dark:text-slate-400">
              👆 Selecione pelo menos um programa para continuar
            </p>
          ) : (
            <p className="text-green-600 text-sm font-semibold flex items-center gap-2 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              Pronto para baixar!
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-400 rounded-lg p-6 shadow-md dark:from-slate-800 dark:to-slate-700 dark:border-orange-600">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="text-orange-800 font-semibold mb-1 dark:text-orange-400">
                  Importante:
                </p>
                <p className="text-orange-700 text-sm dark:text-orange-300">
                  Os programas serão abertos em novas abas. Certifique-se de permitir pop-ups no seu navegador para que todos os downloads sejam iniciados corretamente.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-400 text-sm dark:text-slate-500">
            <p>Initial Programs - Download simplificado de softwares essenciais</p>
            <p className="mt-4 text-slate-600 text-sm dark:text-slate-400">
              © Luan Machado. Todos os direitos reservados.
            </p>
            <div className="mt-6 flex gap-3 justify-center md:justify-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://github.com/mcdcwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/luanmachadof/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}