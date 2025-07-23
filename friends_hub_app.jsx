import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Gamepad2,
  PlusCircle,
  Sparkles,
  Users,
  Settings,
  PlayCircle,
  Dice5,
  KeyRound,
  MoonStar,
  Sun,
  ShieldCheck,
  UserCircle,
  Coins,
  Store,
  Globe,
  Cpu,
} from "lucide-react";

export default function FriendsHub() {
  const [players, setPlayers] = React.useState([]);
  const [newPlayer, setNewPlayer] = React.useState("");
  const [assignedRoles, setAssignedRoles] = React.useState([]);
  const [phase, setPhase] = React.useState("setup");
  const [log, setLog] = React.useState([]);
  const [eliminated, setEliminated] = React.useState([]);
  const [accessCode, setAccessCode] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState(false);
  const [adminCode, setAdminCode] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [newGameName, setNewGameName] = React.useState("");
  const [games, setGames] = React.useState([]);
  const [gameValue, setGameValue] = React.useState({});
  const [wallet, setWallet] = React.useState(1000);
  const [selectedMechanics, setSelectedMechanics] = React.useState([]);
  const [avatar, setAvatar] = React.useState("🧑");

  const roles = ["Werwolf", "Dorfbewohner", "Seher", "Jäger", "Hexe", "Schutzengel"];
  const mechanicsList = ["PvP", "PvE", "Crafting", "Quests", "Handel", "XP", "Loot", "Open World", "KI-Gegner"];

  const assignRoles = () => {
    const shuffled = [...players]
      .sort(() => 0.5 - Math.random())
      .map((name, idx) => ({ name, role: roles[idx % roles.length], alive: true }));
    setAssignedRoles(shuffled);
    setPhase("night");
    setLog(["🌙 Nacht beginnt. Werwölfe wählen ein Opfer."]);
  };

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      setPlayers([...players, newPlayer]);
      setNewPlayer("");
    }
  };

  const nextPhase = () => {
    if (phase === "night") {
      setLog((l) => [...l, "☀️ Der Tag beginnt. Diskutiert und stimmt ab."]);
      setPhase("day");
    } else {
      setLog((l) => [...l, "🌙 Die Nacht kehrt zurück. Werwölfe erwachen erneut."]);
      setPhase("night");
    }
  };

  const eliminatePlayer = (name) => {
    setEliminated([...eliminated, name]);
    setAssignedRoles(
      assignedRoles.map((p) => (p.name === name ? { ...p, alive: false } : p))
    );
    setLog((l) => [...l, `☠️ ${name} wurde eliminiert.`]);
  };

  const createGame = () => {
    if (newGameName.trim()) {
      const newValue = Math.floor(Math.random() * 500 + 100);
      setGames([...games, {
        name: newGameName,
        creator: isAdmin ? "ADMIN" : "User",
        mechanics: selectedMechanics,
        value: newValue
      }]);
      setGameValue({ ...gameValue, [newGameName]: newValue });
      setWallet(wallet + newValue);
      setNewGameName("");
      setSelectedMechanics([]);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold mb-6">🔒 Zugangscode erforderlich</h1>
        <Input
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Code eingeben (Peter2808)"
          className="mb-4 bg-white/10 text-white"
        />
        <Button onClick={() => accessCode === "Peter2808" && setAuthenticated(true)}>
          Betreten
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-zinc-900 to-slate-800 text-white p-8 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500">
        👑 KingBoss420
      </h1>

      {!isAdmin && (
        <div className="mb-6">
          <Input
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Admin-Code (420p)"
            className="mb-2 bg-white/10 text-white"
          />
          <Button onClick={() => adminCode === "420p" && setIsAdmin(true)} className="bg-gradient-to-r from-blue-500 to-green-500">
            Admin-Modus aktivieren
          </Button>
        </div>
      )}

      {isAdmin && (
        <Card className="mb-6 bg-white/10 border-white/20 p-6 rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-400" /> Admin-Bereich
            </h2>
            <p>👥 Spieler: {players.join(", ") || "Keine"}</p>
            <p>🎲 Spiele: {games.map((g) => g.name).join(", ") || "Keine"}</p>
            <p>📜 Protokoll: {log.length} Einträge</p>
            <p>💰 Wallet: {wallet} ⚡</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-8">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">🕹️ Neues Spiel erstellen</h2>
          <Input
            value={newGameName}
            onChange={(e) => setNewGameName(e.target.value)}
            placeholder="Spielname eingeben"
            className="bg-white/10 text-white mb-4"
          />
          <div className="grid grid-cols-2 gap-2 mb-4">
            {mechanicsList.map((m) => (
              <Button
                key={m}
                onClick={() =>
                  setSelectedMechanics(
                    selectedMechanics.includes(m)
                      ? selectedMechanics.filter((x) => x !== m)
                      : [...selectedMechanics, m]
                  )
                }
                className={`text-sm ${selectedMechanics.includes(m) ? "bg-green-500" : "bg-white/10"}`}
              >
                {m}
              </Button>
            ))}
          </div>
          <Button onClick={createGame} className="bg-gradient-to-r from-pink-500 to-purple-700 text-white">
            Spiel veröffentlichen & Wert generieren
          </Button>
          <ul className="mt-4 text-white/80 space-y-1">
            {games.map((game, i) => (
              <li key={i}>🎮 {game.name} ({game.mechanics.join(", ")}) – 💸 {game.value}⚡</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
