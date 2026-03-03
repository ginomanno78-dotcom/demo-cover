import { useState } from "react";

const OPERATORI = [
  { id:"V01", nome:"Resp. Verrengia", ruolo:"Responsabile Parco Mezzi" },
  { id:"A01", nome:"A. Esposito", ruolo:"Capo Cantiere" },
  { id:"B01", nome:"M. Russo", ruolo:"Segreteria" },
];

const mezzi = [
  { id:1, cat:"Edilizia", nome:"Autocarro Scarrabile", desc:"Autocarro scarrabile per trasporto inerti e materiali", stato:"cantiere", revisione:"2025-04-08", assicurazione:"2025-09-20", bollo:"2025-05-15", carburante:310, guastiAperti:0, icon:"🚛" },
  { id:2, cat:"Edilizia", nome:"Autocarro TURBO DAILY 35/E4", desc:"Autocarro leggero per trasporti urbani e logistica", stato:"deposito", revisione:"2025-03-28", assicurazione:"2025-10-05", bollo:"2025-05-01", carburante:145, guastiAperti:0, icon:"🚐" },
  { id:3, cat:"Edilizia", nome:"Rullo WACKER NEUSON RD18-80", desc:"Rullo tandem per compattazione asfalto e terreni", stato:"officina", revisione:"2025-04-02", assicurazione:"2025-08-20", bollo:"2025-05-10", carburante:0, guastiAperti:2, icon:"🛞" },
  { id:4, cat:"Movimento Terra", nome:"Mini Terna JCB 1CX HF-DW", desc:"Mini terna gommata per scavi in spazi ristretti", stato:"cantiere", revisione:"2025-06-15", assicurazione:"2025-11-10", bollo:"2025-07-01", carburante:180, guastiAperti:0, icon:"🚜" },
  { id:5, cat:"Movimento Terra", nome:"Escavatore PC 210 NLC-8", desc:"Escavatore cingolato medio per scavi e demolizioni", stato:"cantiere", revisione:"2025-05-05", assicurazione:"2025-09-01", bollo:"2025-04-20", carburante:520, guastiAperti:1, icon:"🦾" },
  { id:6, cat:"Movimento Terra", nome:"Miniescavatore PC15", desc:"Miniescavatore per lavori in aree urbane ristrette", stato:"deposito", revisione:"2025-11-18", assicurazione:"2026-04-10", bollo:"2025-12-01", carburante:90, guastiAperti:0, icon:"🦾" },
  { id:7, cat:"Movimento Terra", nome:"Escavatore JCB 8035 ZTS", desc:"Miniescavatore a sbalzo zero per cantieri urbani", stato:"deposito", revisione:"2026-02-01", assicurazione:"2026-05-15", bollo:"2026-03-10", carburante:140, guastiAperti:0, icon:"🦾" },
  { id:8, cat:"Movimento Terra", nome:"Pala Cingolata FL10", desc:"Pala cingolata per movimentazione terra e inerti", stato:"cantiere", revisione:"2025-07-28", assicurazione:"2025-11-10", bollo:"2025-06-30", carburante:390, guastiAperti:0, icon:"🚜" },
  { id:9, cat:"Trasporti", nome:"Trattore Stradale MAN", desc:"Trattore per traino semirimorchi su lunghe percorrenze", stato:"cantiere", revisione:"2025-04-18", assicurazione:"2025-09-25", bollo:"2025-05-15", carburante:850, guastiAperti:0, icon:"🚚" },
  { id:10, cat:"Trasporti", nome:"Semirimorchio DE ANGELIS", desc:"Semirimorchio per trasporto merci su strada", stato:"deposito", revisione:"2025-08-14", assicurazione:"2025-12-28", bollo:"2025-09-20", carburante:0, guastiAperti:0, icon:"🚛" },
  { id:11, cat:"Trasporti", nome:"Semirimorchio Centina SCHMITZ", desc:"Semirimorchio centinato per carichi voluminosi", stato:"cantiere", revisione:"2025-10-08", assicurazione:"2026-03-20", bollo:"2025-11-01", carburante:0, guastiAperti:0, icon:"🚛" },
  { id:12, cat:"Trasporti", nome:"Semirimorchio Vasca SCHMITZ", desc:"Semirimorchio a vasca per trasporto rifiuti e inerti", stato:"deposito", revisione:"2026-01-15", assicurazione:"2026-04-08", bollo:"2026-02-10", carburante:0, guastiAperti:0, icon:"🚛" },
  { id:13, cat:"Sollevamenti", nome:"Carrello Elevatore LINDE H25D", desc:"Carrello elevatore diesel per magazzino e cantiere", stato:"deposito", revisione:"2025-04-05", assicurazione:"2025-09-10", bollo:"2025-05-01", carburante:120, guastiAperti:0, icon:"🏋️" },
  { id:14, cat:"Sollevamenti", nome:"Sollevatore DIECI PEGASUS 60.21 ST.4", desc:"Sollevatore telescopico ad alta portata e raggiunta", stato:"cantiere", revisione:"2025-03-22", assicurazione:"2025-08-05", bollo:"2025-04-15", carburante:410, guastiAperti:1, icon:"🏗️" },
  { id:15, cat:"Sollevamenti", nome:"Autogrù TEREX RT1045L", desc:"Autogrù tutto terreno per sollevamenti in cantiere", stato:"deposito", revisione:"2025-09-28", assicurazione:"2026-01-05", bollo:"2025-10-25", carburante:280, guastiAperti:0, icon:"🏗️" },
];

const guastiLog = [
  { id:1, mezzo:"Rullo WACKER NEUSON RD18-80", data:"2025-02-10", desc:"Tamburo anteriore — anomalia vibrazione. Mezzo fermo in officina.", stato:"aperto", priorita:"critica" },
  { id:2, mezzo:"Rullo WACKER NEUSON RD18-80", data:"2025-02-22", desc:"Batteria di avviamento da sostituire.", stato:"aperto", priorita:"media" },
  { id:3, mezzo:"Escavatore PC 210 NLC-8", data:"2025-02-20", desc:"Sensore temperatura motore — segnalazione intermittente.", stato:"aperto", priorita:"media" },
  { id:4, mezzo:"Sollevatore DIECI PEGASUS 60.21", data:"2025-02-08", desc:"Braccio telescopico — gioco eccessivo nell'estensione.", stato:"aperto", priorita:"alta" },
  { id:5, mezzo:"Escavatore PC15", data:"2025-01-28", desc:"Sostituzione filtro idraulico — completata.", stato:"risolto", priorita:"bassa" },
  { id:6, mezzo:"Trattore Stradale MAN", data:"2025-01-15", desc:"Pneumatico anteriore sinistro — foratura riparata.", stato:"risolto", priorita:"bassa" },
];

const categorie = ["Edilizia","Movimento Terra","Trasporti","Sollevamenti"];
const catIcon = {"Edilizia":"🏗️","Movimento Terra":"🚜","Trasporti":"🚚","Sollevamenti":"🏋️"};
const catColore = {"Edilizia":"#f97316","Movimento Terra":"#22c55e","Trasporti":"#3b82f6","Sollevamenti":"#a855f7"};
const statoColore = {cantiere:"#f97316",deposito:"#22c55e",officina:"#ef4444"};
const statoLabel = {cantiere:"In Cantiere",deposito:"Al Deposito",officina:"In Officina"};
const prioritaColore = {critica:"#ef4444",alta:"#f97316",media:"#eab308",bassa:"#22c55e"};
const formatData = d => new Date(d).toLocaleDateString("it-IT",{day:"2-digit",month:"short",year:"numeric"});
const giorniMancanti = d => Math.ceil((new Date(d)-new Date())/(1000*60*60*24));

export default function FleetCover() {
  const [vista, setVista] = useState("dashboard");
  const [catAttiva, setCatAttiva] = useState("Edilizia");
  const [filtroStato, setFiltroStato] = useState("tutti");
  const [cerca, setCerca] = useState("");
  const [mezzoSel, setMezzoSel] = useState(null);
  const [operatore, setOperatore] = useState(OPERATORI[0]);
  const [showOpMenu, setShowOpMenu] = useState(false);

  const totCantiere = mezzi.filter(m=>m.stato==="cantiere").length;
  const totDeposito = mezzi.filter(m=>m.stato==="deposito").length;
  const totOfficina = mezzi.filter(m=>m.stato==="officina").length;
  const totGuasti = guastiLog.filter(g=>g.stato==="aperto").length;

  const mezziFiltrati = mezzi.filter(m=>
    m.cat===catAttiva &&
    (filtroStato==="tutti"||m.stato===filtroStato) &&
    m.nome.toLowerCase().includes(cerca.toLowerCase())
  );

  const scadenzeAll = mezzi.flatMap(m=>[
    {mezzo:m.nome,cat:m.cat,tipo:"Revisione",data:m.revisione,icon:"🔍"},
    {mezzo:m.nome,cat:m.cat,tipo:"Assicurazione",data:m.assicurazione,icon:"🛡️"},
    {mezzo:m.nome,cat:m.cat,tipo:"Bollo",data:m.bollo,icon:"📋"},
  ]).filter(s=>giorniMancanti(s.data)>=0).sort((a,b)=>new Date(a.data)-new Date(b.data));

  const handlePrint = () => {
    if(!mezzoSel) return;
    const m = mezzoSel;
    const gr=giorniMancanti(m.revisione), ga=giorniMancanti(m.assicurazione), gb=giorniMancanti(m.bollo);
    const cRev=gr<=30?"#dc2626":gr<=90?"#ea580c":"#16a34a";
    const cAss=ga<=30?"#dc2626":ga<=90?"#ea580c":"#16a34a";
    const cBol=gb<=30?"#dc2626":gb<=90?"#ea580c":"#16a34a";
    const w=window.open('','_blank','width=800,height=700');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Scheda — ${m.nome}</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',sans-serif;padding:30px;color:#111}
    .hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1e3a8a;padding-bottom:14px;margin-bottom:20px}
    .logo{font-size:26px;font-weight:900;letter-spacing:3px;color:#1e3a8a}.logo small{font-size:12px;letter-spacing:2px;color:#64748b;display:block;margin-top:2px}
    .meta{text-align:right;font-size:11px;color:#64748b}.meta strong{display:block;font-size:13px;color:#111;margin-bottom:2px}
    h2{font-size:19px;font-weight:700;color:#1e3a8a;margin-bottom:8px}
    .sb{display:inline-block;padding:3px 12px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-right:6px;margin-bottom:12px}
    .desc{font-size:12px;color:#64748b;background:#f8fafc;padding:9px 12px;border-radius:7px;margin-bottom:18px;border-left:3px solid #e2e8f0;font-style:italic}
    .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
    .box{border:1px solid #e2e8f0;border-radius:9px;padding:12px}
    .box .lbl{font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
    .box .val{font-size:15px;font-weight:700}.box .gg{font-size:11px;font-weight:600;margin-top:2px}
    .sh3{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:7px;border-bottom:1px solid #f1f5f9;padding-bottom:3px}
    .note{border:1px solid #e2e8f0;border-radius:8px;padding:10px;min-height:60px;font-size:12px;color:#94a3b8;font-style:italic}
    .firma{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:28px;border-top:1px solid #e2e8f0;padding-top:18px}
    .fline{border-bottom:1px solid #111;margin-top:28px;height:1px}.flbl{font-size:10px;color:#94a3b8;margin-top:5px}
    .footer{margin-top:20px;font-size:9px;color:#94a3b8;text-align:center;border-top:1px solid #f1f5f9;padding-top:10px}
    .op-box{background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:12px}
    @media print{body{padding:16px}}</style></head><body>
    <div class="hdr">
      <div><div class="logo">CO.VER. SRL<small>FLOTTA — GESTIONE PARCO MEZZI</small></div></div>
      <div class="meta"><strong>SCHEDA MEZZO</strong>Data: ${new Date().toLocaleDateString("it-IT",{day:"2-digit",month:"long",year:"numeric"})}<br>Ora: ${new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}</div>
    </div>
    <h2>${m.icon} ${m.nome}</h2>
    <span class="sb" style="background:#dbeafe;color:#1e3a8a">${m.cat}</span>
    <span class="sb" style="background:${statoColore[m.stato]}22;color:${statoColore[m.stato]}">${statoLabel[m.stato]}</span>
    <div class="desc">${m.desc}</div>
    <div class="op-box">👤 <strong>Compilato da:</strong> ${operatore.nome} — ${operatore.ruolo} — ID: ${operatore.id}</div>
    <div class="sh3">Scadenze Documenti</div>
    <div class="grid3">
      <div class="box" style="border-left:4px solid ${cRev}"><div class="lbl">🔍 Revisione</div><div class="val" style="color:${cRev}">${formatData(m.revisione)}</div><div class="gg" style="color:${cRev}">${gr} giorni</div></div>
      <div class="box" style="border-left:4px solid ${cAss}"><div class="lbl">🛡️ Assicurazione</div><div class="val" style="color:${cAss}">${formatData(m.assicurazione)}</div><div class="gg" style="color:${cAss}">${ga} giorni</div></div>
      <div class="box" style="border-left:4px solid ${cBol}"><div class="lbl">📋 Bollo</div><div class="val" style="color:${cBol}">${formatData(m.bollo)}</div><div class="gg" style="color:${cBol}">${gb} giorni</div></div>
    </div>
    <div class="sh3">Carburante & Stato</div>
    <div class="grid2">
      <div class="box"><div class="lbl">⛽ Carburante mese</div><div class="val">${m.carburante>0?m.carburante+" L":"— (elettrico/rim.)"}</div></div>
      <div class="box"><div class="lbl">⚠️ Guasti aperti</div><div class="val" style="color:${m.guastiAperti>0?"#dc2626":"#16a34a"}">${m.guastiAperti}</div></div>
    </div>
    <div class="sh3">Note operative</div><div class="note">[ Spazio per annotazioni manuali ]</div>
    <div class="firma">
      <div><div style="font-size:11px;color:#64748b;margin-bottom:3px">Compilato da</div><strong>${operatore.nome}</strong><div style="font-size:10px;color:#94a3b8">${operatore.ruolo} · ${operatore.id}</div><div class="fline"></div><div class="flbl">Firma</div></div>
      <div><div style="font-size:11px;color:#64748b;margin-bottom:3px">Visto / Approvato</div><strong>Resp. Verrengia</strong><div style="font-size:10px;color:#94a3b8">Responsabile Parco Mezzi</div><div class="fline"></div><div class="flbl">Firma</div></div>
    </div>
    <div class="footer">CO.VER. SRL — FLOTTA Gestione Parco Mezzi · Documento generato: ${new Date().toLocaleString("it-IT")}</div>
    </body></html>`);
    w.document.close(); setTimeout(()=>w.print(),400);
  };

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Bebas+Neue&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    .nb{background:none;border:none;color:#64748b;cursor:pointer;padding:9px 12px;border-radius:7px;font-size:12px;font-weight:500;font-family:inherit;transition:all .2s;display:flex;align-items:center;gap:8px;width:100%}
    .nb:hover{background:#141c2c;color:#e2e8f0}.nb.on{background:#141c2c;color:#f97316;border-left:3px solid #f97316;padding-left:9px}
    .card{background:#0f1422;border:1px solid #1a2440;border-radius:12px;padding:16px}
    .mr{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:9px;cursor:pointer;transition:all .15s;border:1px solid #1a2440;margin-bottom:6px;background:#0f1422}
    .mr:hover{border-color:#f97316;background:#131b2e;transform:translateX(3px)}
    .badge{padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
    .btn{padding:7px 14px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;font-size:12px;font-weight:700;transition:all .2s}
    .bto{background:#f97316;color:#fff}.bto:hover{background:#ea6c0a}
    .btg{background:#1a2440;color:#94a3b8}.btg:hover{background:#1f2d50;color:#e2e8f0}
    .btp{background:#312e81;color:#a5b4fc}.btp:hover{background:#3730a3;color:#fff}
    .fb{padding:5px 12px;border-radius:20px;border:1px solid #1a2440;cursor:pointer;font-family:inherit;font-size:11px;font-weight:600;transition:all .2s}
    .fb.on{background:#f97316;border-color:#f97316;color:#fff}.fb:not(.on){background:#0f1422;color:#64748b}
    .si{background:#0f1422;border:1px solid #1a2440;border-radius:8px;padding:7px 11px;color:#e2e8f0;font-family:inherit;font-size:12px;outline:none;width:155px}
    .si:focus{border-color:#f97316}
    .tab{padding:8px 12px;border:none;cursor:pointer;font-family:inherit;font-size:11px;font-weight:700;transition:all .2s;border-bottom:2px solid transparent;background:none;color:#64748b;letter-spacing:.3px}
    .scard{border-radius:12px;padding:15px;cursor:pointer;transition:transform .15s;position:relative;overflow:hidden;background:#0f1422;border:1px solid #1a2440}
    .scard:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3)}
    .mo{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}
    .md{background:#0f1422;border:1px solid #1a2440;border-radius:16px;width:100%;max-width:520px;max-height:92vh;overflow-y:auto}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0c14}::-webkit-scrollbar-thumb{background:#f97316;border-radius:2px}
    .opmenu{position:absolute;top:calc(100% + 4px);right:0;background:#0f1422;border:1px solid #1a2440;border-radius:9px;min-width:210px;z-index:200;box-shadow:0 8px 28px rgba(0,0,0,.6);overflow:hidden}
    .opitem{padding:10px 14px;cursor:pointer;font-size:12px;transition:background .15s}.opitem:hover{background:#141c2c}
  `;

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#0a0c14",minHeight:"100vh",color:"#e2e8f0"}}>
      <style>{css}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(180deg,#0c1020,#0a0c14)",borderBottom:"1px solid #1a2440",padding:"0 18px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{background:"linear-gradient(160deg,#1c2d6a,#0e1840,#182460)",border:"1px solid #2e4080",borderRadius:7,padding:"5px 14px",boxShadow:"inset 0 1px 0 rgba(140,170,230,.15),0 2px 8px rgba(0,0,0,.5)"}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,letterSpacing:3,background:"linear-gradient(180deg,#b0c4ee,#5570bb,#3a55a8,#8899cc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>CO.VER. SRL</span>
          </div>
          <div style={{width:1,height:28,background:"#1a2440"}}/>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:19,letterSpacing:3,color:"#f97316",lineHeight:1}}>FLOTTA</div>
            <div style={{fontSize:8,color:"#283860",letterSpacing:2,marginTop:1}}>GESTIONE PARCO MEZZI</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <span style={{fontSize:11,color:"#283860"}}>📅 {new Date().toLocaleDateString("it-IT",{weekday:"short",day:"numeric",month:"short"})}</span>
          {totGuasti>0&&<div onClick={()=>setVista("guasti")} style={{background:"#ef4444",borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,cursor:"pointer"}}>{totGuasti}</div>}
          <div style={{position:"relative"}}>
            <div onClick={()=>setShowOpMenu(!showOpMenu)} style={{background:"#0f1422",border:"1px solid #1a2440",borderRadius:7,padding:"5px 10px",fontSize:11,color:"#94a3b8",cursor:"pointer",display:"flex",alignItems:"center",gap:6,userSelect:"none"}}>
              <span>👤</span><span style={{color:"#e2e8f0",fontWeight:600}}>{operatore.nome}</span><span style={{color:"#283860",fontSize:9}}>▼</span>
            </div>
            {showOpMenu&&(
              <div className="opmenu">
                <div style={{padding:"7px 14px",fontSize:9,color:"#283860",letterSpacing:1.5,borderBottom:"1px solid #1a2440"}}>SELEZIONA OPERATORE</div>
                {OPERATORI.map(op=>(
                  <div key={op.id} className="opitem" onClick={()=>{setOperatore(op);setShowOpMenu(false);}}>
                    <div style={{fontWeight:600,color:"#e2e8f0"}}>{op.nome}</div>
                    <div style={{fontSize:10,color:"#64748b"}}>{op.ruolo} · {op.id}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"flex"}}>
        {/* SIDEBAR */}
        <div style={{width:175,background:"#0c1020",borderRight:"1px solid #1a2440",minHeight:"calc(100vh - 60px)",padding:"12px 8px",flexShrink:0,position:"sticky",top:60,height:"calc(100vh - 60px)",overflowY:"auto"}}>
          <div style={{fontSize:9,color:"#1e2d50",letterSpacing:2,padding:"0 4px",marginBottom:6,marginTop:2}}>NAVIGAZIONE</div>
          {[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"mezzi",icon:"🚛",label:"Parco Mezzi"},{id:"scadenze",icon:"📅",label:"Scadenze"},{id:"guasti",icon:"🔧",label:`Guasti${totGuasti>0?` (${totGuasti})`:""}`},{id:"carburante",icon:"⛽",label:"Carburante"}].map(item=>(
            <button key={item.id} className={`nb ${vista===item.id?"on":""}`} onClick={()=>setVista(item.id)}>
              <span style={{fontSize:14}}>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
          <div style={{fontSize:9,color:"#1e2d50",letterSpacing:2,padding:"0 4px",marginBottom:6,marginTop:18}}>TOTALI</div>
          {[{l:"Tot. Mezzi",v:mezzi.length,c:"#475569"},{l:"In Cantiere",v:totCantiere,c:"#f97316"},{l:"Al Deposito",v:totDeposito,c:"#22c55e"},{l:"In Officina",v:totOfficina,c:"#ef4444"}].map(s=>(
            <div key={s.l} style={{display:"flex",justifyContent:"space-between",padding:"5px 7px"}}>
              <span style={{fontSize:10,color:"#334468"}}>{s.l}</span><span style={{fontSize:11,fontWeight:700,color:s.c}}>{s.v}</span>
            </div>
          ))}
          <div style={{marginTop:14,padding:"10px 8px",background:"#0a0c14",borderRadius:8,border:"1px solid #1a2440"}}>
            <div style={{fontSize:9,color:"#1e2d50",letterSpacing:1.5,marginBottom:5}}>OPERATORE ATTIVO</div>
            <div style={{fontSize:11,fontWeight:700,color:"#60a5fa"}}>{operatore.nome}</div>
            <div style={{fontSize:9,color:"#334468"}}>{operatore.ruolo}</div>
            <div style={{fontSize:9,color:"#1e2d50",marginTop:1}}>ID: {operatore.id}</div>
          </div>
        </div>

        {/* CONTENUTO */}
        <div style={{flex:1,padding:18,overflowY:"auto",maxHeight:"calc(100vh - 60px)"}}>

          {/* DASHBOARD */}
          {vista==="dashboard"&&(
            <div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:2,marginBottom:2}}>SITUAZIONE ATTUALE</h1>
              <p style={{color:"#283860",fontSize:11,marginBottom:16}}>Parco mezzi CO.VER. srl — {new Date().toLocaleDateString("it-IT")} · <span style={{color:"#60a5fa"}}>{operatore.nome}</span></p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
                {[{label:"In Cantiere",v:totCantiere,icon:"🏗️",c:"#f97316",sub:`di ${mezzi.length} mezzi`,t:"mezzi",f:"cantiere"},{label:"Al Deposito",v:totDeposito,icon:"🅿️",c:"#22c55e",sub:"disponibili",t:"mezzi",f:"deposito"},{label:"In Officina",v:totOfficina,icon:"🔧",c:"#ef4444",sub:"in riparazione",t:"mezzi",f:"officina"},{label:"Guasti Aperti",v:totGuasti,icon:"⚠️",c:"#eab308",sub:"da risolvere",t:"guasti",f:null}].map(s=>(
                  <div key={s.label} className="scard" onClick={()=>{setVista(s.t);if(s.f)setFiltroStato(s.f);}} style={{borderTop:`3px solid ${s.c}`}}>
                    <div style={{fontSize:20}}>{s.icon}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:s.c,lineHeight:1,marginTop:4}}>{s.v}</div>
                    <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",marginTop:3}}>{s.label}</div>
                    <div style={{fontSize:10,color:"#283860",marginTop:1}}>{s.sub}</div>
                    <div style={{fontSize:9,color:s.c,marginTop:5,opacity:.6}}>clicca per dettagli →</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div className="card">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <h3 style={{fontSize:12,fontWeight:700}}>⚠️ Scadenze Imminenti</h3>
                    <button className="btn btg" style={{padding:"3px 9px",fontSize:11}} onClick={()=>setVista("scadenze")}>Tutte →</button>
                  </div>
                  {scadenzeAll.filter(s=>giorniMancanti(s.data)<=50).slice(0,7).map((s,i)=>{
                    const g=giorniMancanti(s.data),c=g<=14?"#ef4444":g<=30?"#f97316":"#eab308";
                    return(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",background:"#0a0c14",borderRadius:7,marginBottom:4,borderLeft:`3px solid ${c}`}}>
                      <span style={{fontSize:13}}>{s.icon}</span>
                      <div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.mezzo}</div><div style={{fontSize:9,color:"#283860"}}>{s.tipo}</div></div>
                      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:11,fontWeight:700,color:c}}>{g}gg</div><div style={{fontSize:9,color:"#283860"}}>{formatData(s.data)}</div></div>
                    </div>);
                  })}
                </div>
                <div className="card">
                  <h3 style={{fontSize:12,fontWeight:700,marginBottom:12}}>📂 Mezzi per Categoria</h3>
                  {categorie.map(cat=>{
                    const mc=mezzi.filter(m=>m.cat===cat);
                    return(<div key={cat} onClick={()=>{setVista("mezzi");setCatAttiva(cat);setFiltroStato("tutti");setCerca("");}} style={{padding:"9px 11px",background:"#0a0c14",borderRadius:8,marginBottom:7,cursor:"pointer",border:"1px solid #1a2440",transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=catColore[cat]} onMouseLeave={e=>e.currentTarget.style.borderColor="#1a2440"}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,fontWeight:700,color:catColore[cat]}}>{catIcon[cat]} {cat}</span><span style={{fontSize:10,color:"#64748b"}}>{mc.length} mezzi</span></div>
                      <div style={{display:"flex",gap:10}}>
                        <span style={{fontSize:10,color:"#f97316"}}>🏗️ {mc.filter(m=>m.stato==="cantiere").length}</span>
                        <span style={{fontSize:10,color:"#22c55e"}}>🅿️ {mc.filter(m=>m.stato==="deposito").length}</span>
                        {mc.filter(m=>m.stato==="officina").length>0&&<span style={{fontSize:10,color:"#ef4444"}}>🔧 {mc.filter(m=>m.stato==="officina").length}</span>}
                      </div>
                    </div>);
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PARCO MEZZI */}
          {vista==="mezzi"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div><h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:2}}>PARCO MEZZI</h1><p style={{color:"#283860",fontSize:11}}>{mezzi.length} veicoli registrati</p></div>
                <button className="btn bto">+ Aggiungi Mezzo</button>
              </div>
              <div style={{borderBottom:"1px solid #1a2440",marginBottom:12,display:"flex",gap:2,flexWrap:"wrap"}}>
                {categorie.map(cat=>(
                  <button key={cat} className="tab" onClick={()=>{setCatAttiva(cat);setFiltroStato("tutti");setCerca("");}} style={{color:catAttiva===cat?catColore[cat]:"#64748b",borderBottomColor:catAttiva===cat?catColore[cat]:"transparent"}}>
                    {catIcon[cat]} {cat} <span style={{opacity:.5}}>({mezzi.filter(m=>m.cat===cat).length})</span>
                  </button>
                ))}
              </div>
              <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
                {["tutti","cantiere","deposito","officina"].map(f=>(
                  <button key={f} className={`fb ${filtroStato===f?"on":""}`} onClick={()=>setFiltroStato(f)}>{f==="tutti"?"Tutti":statoLabel[f]}</button>
                ))}
                <input className="si" placeholder="🔍 Cerca mezzo..." value={cerca} onChange={e=>setCerca(e.target.value)}/>
              </div>
              {mezziFiltrati.length===0&&<div style={{textAlign:"center",padding:40,color:"#283860"}}>Nessun mezzo trovato</div>}
              {mezziFiltrati.map(m=>{
                const gr=giorniMancanti(m.revisione);
                return(<div key={m.id} className="mr" onClick={()=>setMezzoSel(m)}>
                  <div style={{fontSize:20,width:30,textAlign:"center",flexShrink:0}}>{m.icon}</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:12,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.nome}</div><div style={{fontSize:10,color:"#283860",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.desc}</div></div>
                  <span className="badge" style={{background:`${statoColore[m.stato]}18`,color:statoColore[m.stato],flexShrink:0}}>{statoLabel[m.stato]}</span>
                  {gr<=30&&<span className="badge" style={{background:"#f9731618",color:"#f97316",flexShrink:0}}>⚠️ {gr}gg</span>}
                  {m.guastiAperti>0&&<span className="badge" style={{background:"#ef444418",color:"#ef4444",flexShrink:0}}>🔧{m.guastiAperti}</span>}
                  <span style={{color:"#283860",flexShrink:0}}>›</span>
                </div>);
              })}
            </div>
          )}

          {/* SCADENZE */}
          {vista==="scadenze"&&(
            <div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:2,marginBottom:2}}>SCADENZE</h1>
              <p style={{color:"#283860",fontSize:11,marginBottom:18}}>Revisioni, assicurazioni e bolli — tutti i {mezzi.length} mezzi</p>
              {[["🔴 URGENTI — Entro 30 giorni",[0,30],"#ef4444"],["🟡 IN SCADENZA — Entro 90 giorni",[30,90],"#f97316"],["🟢 OK — Oltre 90 giorni",[90,9999],"#22c55e"]].map(([titolo,[min,max],colore])=>{
                const items=scadenzeAll.filter(s=>{const g=giorniMancanti(s.data);return g>=min&&g<max;});
                if(!items.length) return null;
                return(<div key={titolo} style={{marginBottom:20}}>
                  <h3 style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:9,letterSpacing:.5}}>{titolo} ({items.length})</h3>
                  {items.map((s,i)=>{
                    const g=giorniMancanti(s.data);
                    return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"#0f1422",borderRadius:9,marginBottom:5,borderLeft:`3px solid ${colore}`}}>
                      <div style={{width:28,height:28,borderRadius:7,background:`${colore}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{s.icon}</div>
                      <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:11,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.mezzo}</div><div style={{fontSize:9,color:"#283860"}}>{s.tipo}</div></div>
                      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontWeight:700,color:colore,fontSize:13}}>{g}gg</div><div style={{fontSize:9,color:"#283860"}}>{formatData(s.data)}</div></div>
                    </div>);
                  })}
                </div>);
              })}
            </div>
          )}

          {/* GUASTI */}
          {vista==="guasti"&&(
            <div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:2,marginBottom:2}}>GUASTI & MANUTENZIONE</h1>
              <p style={{color:"#283860",fontSize:11,marginBottom:18}}>{totGuasti} segnalazioni aperte · {guastiLog.filter(g=>g.stato==="risolto").length} risolte</p>
              {guastiLog.map(g=>(
                <div key={g.id} style={{background:"#0f1422",border:"1px solid #1a2440",borderRadius:10,padding:"12px 14px",marginBottom:8,borderLeft:`4px solid ${prioritaColore[g.priorita]}`}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:5,flexWrap:"wrap"}}>
                        <span className="badge" style={{background:`${prioritaColore[g.priorita]}18`,color:prioritaColore[g.priorita]}}>{g.priorita.toUpperCase()}</span>
                        <span className="badge" style={{background:g.stato==="aperto"?"#ef444418":"#22c55e18",color:g.stato==="aperto"?"#ef4444":"#22c55e"}}>{g.stato.toUpperCase()}</span>
                      </div>
                      <div style={{fontWeight:600,fontSize:12,color:"#e2e8f0"}}>{g.mezzo}</div>
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:3,lineHeight:1.4}}>{g.desc}</div>
                      <div style={{fontSize:10,color:"#283860",marginTop:5}}>Segnalato: {formatData(g.data)}</div>
                    </div>
                    {g.stato==="aperto"&&<button className="btn btg" style={{fontSize:10,flexShrink:0}}>✓ Risolto</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CARBURANTE */}
          {vista==="carburante"&&(
            <div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:2,marginBottom:2}}>CARBURANTE</h1>
              <p style={{color:"#283860",fontSize:11,marginBottom:16}}>Consumo mensile — Marzo 2025</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
                {[{l:"Totale Litri",v:`${mezzi.reduce((a,m)=>a+m.carburante,0)} L`,c:"#f97316"},{l:"Costo Stimato",v:`€ ${(mezzi.reduce((a,m)=>a+m.carburante,0)*1.75).toFixed(0)}`,c:"#22c55e"},{l:"Mezzi Riforniti",v:mezzi.filter(m=>m.carburante>0).length,c:"#3b82f6"}].map(s=>(
                  <div key={s.l} style={{background:"#0f1422",border:"1px solid #1a2440",borderRadius:10,padding:14,borderTop:`3px solid ${s.c}`}}>
                    <div style={{fontSize:10,color:"#283860",marginBottom:3}}>{s.l}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:s.c,lineHeight:1}}>{s.v}</div>
                  </div>
                ))}
              </div>
              {categorie.map(cat=>{
                const mc=mezzi.filter(m=>m.cat===cat&&m.carburante>0);
                if(!mc.length) return null;
                const maxL=Math.max(...mezzi.filter(m=>m.carburante>0).map(m=>m.carburante));
                return(<div key={cat} style={{marginBottom:18}}>
                  <h3 style={{fontSize:11,fontWeight:700,color:catColore[cat],marginBottom:9}}>{catIcon[cat]} {cat}</h3>
                  {mc.sort((a,b)=>b.carburante-a.carburante).map(m=>(
                    <div key={m.id} style={{background:"#0f1422",borderRadius:8,padding:"10px 12px",marginBottom:6,border:"1px solid #1a2440"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <div style={{fontWeight:600,fontSize:11,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{m.nome}</div>
                        <div style={{flexShrink:0,marginLeft:10}}><span style={{fontWeight:700,color:"#f97316",fontSize:12}}>{m.carburante}L</span><span style={{fontSize:10,color:"#283860",marginLeft:7}}>€{(m.carburante*1.75).toFixed(0)}</span></div>
                      </div>
                      <div style={{background:"#0a0c14",borderRadius:3,height:4,overflow:"hidden"}}><div style={{width:`${(m.carburante/maxL)*100}%`,height:"100%",background:catColore[cat],borderRadius:3}}/></div>
                    </div>
                  ))}
                </div>);
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL MEZZO */}
      {mezzoSel&&(
        <div className="mo" onClick={()=>setMezzoSel(null)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div style={{padding:"14px 18px",borderBottom:"1px solid #1a2440",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:24,width:38,height:38,background:"#0a0c14",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #1a2440"}}>{mezzoSel.icon}</div>
                <div><div style={{fontWeight:700,fontSize:13,color:"#e2e8f0"}}>{mezzoSel.nome}</div><div style={{fontSize:10,color:"#283860"}}>{mezzoSel.cat}</div></div>
              </div>
              <div style={{display:"flex",gap:7,alignItems:"center"}}>
                <button className="btn btp" onClick={handlePrint}>🖨️ Stampa</button>
                <button onClick={()=>setMezzoSel(null)} style={{background:"#1a2440",border:"none",color:"#64748b",cursor:"pointer",borderRadius:7,width:26,height:26,fontSize:13}}>✕</button>
              </div>
            </div>
            <div style={{padding:18}}>
              <div style={{padding:"8px 12px",background:"#060810",borderRadius:8,border:"1px solid #1a2440",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                <span>👤</span>
                <div><div style={{fontSize:9,color:"#283860"}}>Scheda compilata da</div><div style={{fontSize:12,fontWeight:700,color:"#60a5fa"}}>{operatore.nome} <span style={{fontWeight:400,color:"#334468"}}>· {operatore.ruolo} · {operatore.id}</span></div></div>
              </div>
              <span className="badge" style={{background:`${statoColore[mezzoSel.stato]}18`,color:statoColore[mezzoSel.stato],marginBottom:12,display:"inline-block"}}>📍 {statoLabel[mezzoSel.stato]}</span>
              <div style={{fontSize:11,color:"#64748b",marginBottom:14,lineHeight:1.5,padding:"9px 11px",background:"#0a0c14",borderRadius:7}}>{mezzoSel.desc}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                {[{label:"Revisione",v:formatData(mezzoSel.revisione),g:giorniMancanti(mezzoSel.revisione),icon:"🔍"},{label:"Assicurazione",v:formatData(mezzoSel.assicurazione),g:giorniMancanti(mezzoSel.assicurazione),icon:"🛡️"},{label:"Bollo",v:formatData(mezzoSel.bollo),g:giorniMancanti(mezzoSel.bollo),icon:"📋"},{label:"Carburante mese",v:mezzoSel.carburante>0?`${mezzoSel.carburante} L`:"— (elettrico/rim.)",g:null,icon:"⛽"}].map(info=>(
                  <div key={info.label} style={{background:"#0a0c14",borderRadius:8,padding:11,border:"1px solid #1a2440"}}>
                    <div style={{fontSize:9,color:"#283860",marginBottom:3}}>{info.icon} {info.label}</div>
                    <div style={{fontWeight:700,fontSize:12,color:info.g!==null&&info.g<=30?"#f97316":"#e2e8f0"}}>{info.v}</div>
                    {info.g!==null&&<div style={{fontSize:10,color:info.g<=14?"#ef4444":info.g<=30?"#f97316":"#283860",marginTop:2}}>{info.g} giorni rimanenti</div>}
                  </div>
                ))}
              </div>
              {mezzoSel.guastiAperti>0&&(
                <div style={{marginTop:12,padding:11,background:"#ef444410",border:"1px solid #ef444428",borderRadius:9}}>
                  <div style={{fontSize:11,color:"#ef4444",fontWeight:700}}>⚠️ {mezzoSel.guastiAperti} segnalazione/i aperta/e</div>
                  <button className="btn btg" style={{marginTop:7,fontSize:10}} onClick={()=>{setMezzoSel(null);setVista("guasti");}}>Vai ai guasti →</button>
                </div>
              )}
              <div style={{marginTop:14,display:"flex",gap:9}}>
                <button className="btn bto" style={{flex:1}}>✏️ Modifica dati</button>
                <button className="btn btg">🔧 Segnala guasto</button>
                <button className="btn btp" onClick={handlePrint}>🖨️ Stampa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}