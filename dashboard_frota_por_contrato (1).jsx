import React, { useMemo, useState } from "react";
import { Search, Truck, CheckCircle2, AlertTriangle, FolderKanban, FileWarning, KeyRound } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const rawData = [{"c":"PDE LESTE 1","p":"SIE-0A33","m":"VW/17.230 CRM 4X2","t":"PESADO","l":"FORT LOCAÇÕES","f":"PRANCHA","g":"ID265","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 030-24","d":[["Vencido",-357,"2025-03-18"],["Vencido",-510,"2024-10-16"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["Vencido",-220,"2025-08-02"]]},{"c":"DIQUE 1 MINA","p":"QUC-1315","m":"VW/31.330 CRC 6X4","t":"PESADO","l":"A&V LOCAÇÕES","f":"PIPA","g":"ID130","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 017-24","d":[["Vencido",-658,"2024-05-21"],["Vencido",-462,"2024-12-03"],["Vencido",-264,"2025-06-19"],["N/A",null,null],["N/A",null,null],["Vencido",-521,"2024-10-05"]]},{"c":"PDE NW - SERRA LESTE","p":"QVZ-9E98","m":"VOLVO/VM 270 6X4R","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"MUNCK","g":"ID100","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 023-24","d":[["Vencido",-543,"2024-09-13"],["Vencido",-162,"2025-09-29"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["Vencido",-498,"2024-10-28"]]},{"c":"SONDAGEM SERRA NORTE","p":"QVZ-3C77","m":"VOLVO/VM 270 6X4R","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"ARGOS","g":"ID84","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 017-24","d":[["Vencido",-199,"2025-08-23"],["Vencido",-486,"2024-11-09"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["Vencido",-203,"2025-08-19"]]},{"c":"FICO LOTES 8 E 9","p":"B15151","m":"ONIBUS","t":"ÔNIBUS","l":"VALE","f":"N/A","g":"N/A","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 082-22","d":[["N/A",null,null],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FICO LOTES 8 E 9","p":"PXK-7G22","m":"RENAULT/SANDERO EXP1016V","t":"LEVE","l":"GEOMINAS GEOLOGIA","f":"N/A","g":"N/A","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 082-22","d":[["Vencido",-353,"2025-03-22"],["Vencido",-46,"2026-01-28"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"BEMISA","p":"RXA-8C93","m":"MMC/L200 TRITON SPO GL","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Apto","e":"GEOSON 109-25","d":[["No Prazo",44,"2026-04-23"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"INVESTIMENTOS CORRENTES","p":"RNA-9J33","m":"VW/14.190 CRM 4X2","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"PIPA","g":"JJ363","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 138-23","d":[["Vencido",-658,"2024-05-21"],["Vencido",-40,"2026-02-03"],["Vencido",-644,"2024-06-04"],["N/A",null,null],["N/A",null,null],["Vencido",-521,"2024-10-05"]]},{"c":"RIBEIRO CONSTRUÇÃO","p":"PXN-7B70","m":"MM/CANTER 4.7 4X2","t":"PESADO","l":"TRANSGEO MINAS LTDA","f":"CARGA SECA","g":"B805","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 036-24","d":[["Vencido",-352,"2025-03-23"],["Vencido",-56,"2026-01-18"],["Vencido",-122,"2025-11-13"],["N/A",null,null],["N/A",null,null],["Vencido",-36,"2026-02-07"]]},{"c":"STEFANINI IT SOLUTIONS","p":"BBD9I18","m":"CHEVROLET/MONTANA LS2","t":"LEVE","l":"LOCALIZA RENT A CAR S/A","f":"N/A","g":"N/A","o":"LOCADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOLOC 010-23","d":[["Vencido",-680,"2024-04-29"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FILIAL","p":"QVN-8687","m":"TOYOTA/HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID62","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 023-24","d":[["Vencido",-713,"2024-03-27"],["N/A",null,null],["Vencido",-393,"2025-02-10"],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PLANTA DE BENEFICIAMENTO","p":"QVN-8687","m":"TOYOTA/HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID62","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 023-24","d":[["Vencido",-713,"2024-03-27"],["N/A",null,null],["Vencido",-393,"2025-02-10"],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"SERRA LESTE 2","p":"QVN-8729","m":"VW/17.260 CRM 4X2","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"PRANCHA","g":"ID70","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 021-24","d":[["Vencido",-425,"2025-01-09"],["Vencido",-500,"2024-10-26"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["Vencido",-203,"2025-08-19"]]},{"c":"N4WN CANTEIRO","p":"QVN-7904","m":"VW/NOVO 24.280 CRM 6X2","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"PIPA","g":"ID55","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 014-24","d":[["Vencido",-510,"2024-10-16"],["N/A",null,null],["Vencido",-230,"2025-07-23"],["N/A",null,null],["N/A",null,null],["Vencido",-220,"2025-08-02"]]},{"c":"N5W CAVA V","p":"QVZ-8M60","m":"RENAULT/DUSTER OROCH 16 DYN42","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID89","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 022-24","d":[["Vencido",-510,"2024-10-16"],["N/A",null,null],["No Prazo",15,"2026-03-30"],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N/A","p":"QVU-7F35","m":"RENAULT/SANDERO ZEN10MT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"CTI 560","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 117-21","d":[["Vencido",-471,"2024-11-24"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FICO LOTES 8 E 9","p":"QVY-7E96","m":"VW/24.280 CRM 6X2","t":"PESADO","l":"ANDRADE - SERVICOS E LOCACOES DE VEICULO","f":"MUNCK","g":"PR 37","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 030-23","d":[["Vencido",-357,"2025-03-18"],["Vencido",-510,"2024-10-16"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA IV","p":"QPI-8G75","m":"TOYOTA/HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID162","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 031-24","d":[["Vencido",-374,"2025-03-01"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["Vencido",-219,"2025-08-03"]]},{"c":"INVESTIMENTOS CORRENTES","p":"QWR-4B26","m":"VOLVO/VM 290 6X4R","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"MUNCK","g":"J37441","o":null,"z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 138-23","d":[["Vencido",-658,"2024-05-21"],["Vencido",-40,"2026-02-03"],["Vencido",-644,"2024-06-04"],["N/A",null,null],["N/A",null,null],["Vencido",-521,"2024-10-05"]]},{"c":"FICO LOTES 8 E 9","p":"QWU-1J71","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 082-22","d":[["Vencido",-272,"2025-06-15"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA III","p":"QWU-5J79","m":"FIAT/FIORINO ENDURANCE 1.4 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID169","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 017-24","d":[["Vencido",-344,"2025-03-31"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FICO LOTES 8 E 9","p":"QWU-6D08","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 082-22","d":[["Vencido",-272,"2025-06-15"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"ITAMARATI","p":"QWU-6I83","m":"FORD/CARGO 1319","t":"PESADO","l":"CARVEL CARAJAS LOCADORA DE VEICULOS LTDA.","f":"MUNCK","g":"32","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 138-23","d":[["Vencido",-658,"2024-05-21"],["Vencido",-16,"2026-02-27"],["Vencido",-44,"2026-01-30"],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FICO LOTES 8 E 9","p":"QWU-7A22","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 082-22","d":[["Vencido",-272,"2025-06-15"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV3 ANTIGO F7","p":"QWW-7E18","m":"FIAT/FIORINO ENDURANCE 1.4 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID180","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 017-24","d":[["Vencido",-316,"2025-04-29"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV3 ANTIGO F7","p":"QWW-9H04","m":"FIAT/FIORINO ENDURANCE 1.4 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID168","o":"MOBILIZADO","z":null,"s":"INATIVO","h":"Parado","e":"GEOSON 017-24","d":[["Vencido",-289,"2025-05-26"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N/A","p":"QWY-4J03","m":"TOYOTA/HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":"MOBILIZADO","z":"COM CESSÃO DE USO A LEME MINERADORA.","s":"INATIVO","h":"Parado","e":"GEOSON 117-21","d":[["Vencido",-257,"2025-06-30"],["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA III","p":"RWW-1G55","m":"TOYOTA HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID344","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-132,"2025-10-29"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA III","p":"SLF-1H00","m":"TOYOTA HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID371","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Apto","e":"GEOSON 015-25","d":[["No Prazo",15,"2026-03-25"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA IV","p":"SLF-2B28","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID367","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Apto","e":"GEOSON 018-25","d":[["No Prazo",15,"2026-03-25"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV3 OESTE F5","p":"SLF-1H27","m":"TOYOTA HILUX CD DSL 4X4 SRV AT","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID372","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Apto","e":"GEOSON 015-25","d":[["No Prazo",15,"2026-03-25"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5","p":"SFX-0D42","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID361","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Apto","e":"GEOSON 009-25","d":[["No Prazo",28,"2026-04-07"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"09","p":"SGA-7I39","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID339","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-104,"2025-11-26"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"DOCEGEO","p":"SGA-8A31","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID305","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-269,"2025-06-18"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5E1","p":"SGG-8F91","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID335","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-95,"2025-12-05"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5E2","p":"SGJ-9I99","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID334","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-95,"2025-12-05"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W MECOMINA","p":"SGO-5B70","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID333","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-94,"2025-12-06"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5EN MECOMINA","p":"SGP-6I34","m":"RENAULT/OROCH 16SCE XTR 22","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID332","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-94,"2025-12-06"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV3 DESTE F5","p":"SGX-6B56","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID304","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-258,"2025-06-29"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4W CANTEIRO","p":"SHC-7A09","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID303","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-267,"2025-06-20"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"61.2","p":"SHF-8I15","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID318","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-264,"2025-06-23"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"BEMISA CRUZEIRO","p":"SHI-0B64","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID302","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-261,"2025-06-26"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PDE 35","p":"SHJ-8A91","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID317","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-261,"2025-06-26"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CAVA VI","p":"SHL-3I98","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID301","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-257,"2025-06-30"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA IV CANTEIRO","p":"SHM-5D74","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID316","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-220,"2025-08-06"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N5W CAVA IV N1","p":"SHR-6A85","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID300","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-215,"2025-08-11"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV2 F3","p":"SHS-3I93","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID319","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-215,"2025-08-11"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV4 ANTIGO F7","p":"SHT-5A27","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID320","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-213,"2025-08-13"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"N4WS CV4 OESTE F7","p":"SHY-7D75","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID321","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-214,"2025-08-12"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PDE NW - SERRA SUL","p":"SIA-0H29","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID328","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-113,"2025-11-17"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"S11D,CARÁJAS E ALEMÃO","p":"SIB-7B77","m":"VW/NOVO 24.280 CRM 6X2","t":"PESADO","l":"GEOMINAS GEOLOGIA","f":"PIPA","g":"ID44","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 093-24","d":[["Vencido",-497,"2024-10-29"],["Vencido",-78,"2025-12-27"],["Vencido",-230,"2025-07-23"],["N/A",null,null],["N/A",null,null],["Vencido",-220,"2025-08-02"]]},{"c":"PDE LESTE 2","p":"SII-6B88","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID326","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-111,"2025-11-19"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PROJETO 14 E 15","p":"SII-7A25","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID329","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-111,"2025-11-19"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PDE ANJINHO","p":"SIJ-0E11","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID325","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 005-25","d":[["Vencido",-108,"2025-11-22"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"PDE 35","p":"SHE-3F69","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"N/A","o":null,"z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-282,"2025-06-05"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FILIAL","p":"SHE-4G35","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID311","o":"DISPONÍVEL","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-265,"2025-06-22"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FILIAL","p":"SHE-6G24","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID313","o":"MATRIZ","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-265,"2025-06-22"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"FILIAL","p":"SHE-8F59","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID310","o":"MATRIZ","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-265,"2025-06-22"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"SONDAGEM SERRA NORTE","p":"SHE-5G48","m":"FIAT/STRADA ENDURANCE CS 1.3 FLEX","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"ID312","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["No Prazo",4,"2026-03-14"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"BRC","p":"RXA-7G73","m":"MMC/L200 TRITON SPO GL","t":"LEVE","l":"GEOMINAS LOCAÇÃO","f":"N/A","g":"3 256","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"BRCEXPLO001","d":[["Vencido",-16,"2026-02-27"],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null],["N/A",null,null]]},{"c":"SONDAGEM SERRA NORTE","p":"RWY-7B01","m":"M.BENZ/ATEGO 2426 6X2","t":"PESADO","l":"GAT SERVICOS E LOCACOES LTDA","f":"MUNCK","g":"ARG 182 ","o":"MOBILIZADO","z":null,"s":"ATIVO","h":"Crítico","e":"GEOSON 040-24","d":[["Vencido",-22,"2026-02-21"],["Vencido",-16,"2026-02-27"],["Vencido",-30,"2026-02-13"],["N/A",null,null],["N/A",null,null],["N/A",null,null]]}];

const DOC_NAMES = ["CRLV", "QR Code", "Crachá", "CIV", "CIPP", "Tacógrafo"];
const COLORS = {
  Apto: "#22c55e",
  Documento: "#f59e0b",
  Vencido: "#ef4444",
  "Disponível para locação": "#2563eb",
};

const isMissingContract = (value) => !value || value === "N/A" || value === "SEM CONTRATO";
const isAvailableForRental = (row) => isMissingContract(row.c);

const normalizeRow = (row) => {
  const docs = DOC_NAMES.map((name, index) => {
    const item = row.d[index] || [];
    return { nome: name, status: item[0] || "N/A", dias: item[1] ?? null, vencimento: item[2] || null };
  });

  const contrato = isAvailableForRental(row) ? "DISPONÍVEL PARA LOCAÇÃO" : row.c;
  const hasExpired = docs.some((doc) => (doc.status || "").toUpperCase() === "VENCIDO");
  const hasUpcoming = docs.some((doc) => {
    const up = (doc.status || "").toUpperCase();
    return up === "PRAZO CRÍTICO" || up === "PRÓXIMO DO VENCIMENTO" || up === "PROXIMO DO VENCIMENTO" || (doc.dias !== null && doc.dias >= 0 && doc.dias <= 30);
  });

  let resumo = "Apto";
  if (hasExpired) resumo = "Vencido";
  else if (hasUpcoming) resumo = "Documento";
  else if (contrato === "DISPONÍVEL PARA LOCAÇÃO") resumo = "Disponível para locação";

  return {
    contrato,
    placa: row.p || "-",
    modelo: row.m || "-",
    tipo: row.t || "-",
    locadora: row.l || "-",
    frente: row.f || "-",
    tag: row.g || "-",
    statusOperacional: row.o || "-",
    observacao: row.z || null,
    situacao: row.s || "-",
    geoson: row.e || "-",
    docs,
    documentoResumo: resumo,
    disponivelLocacao: contrato === "DISPONÍVEL PARA LOCAÇÃO",
    temDocumentoVencendo: hasUpcoming || hasExpired,
    temVencido: hasExpired,
  };
};

const fleetData = rawData.map(normalizeRow);

const summaryPill = (value) => {
  if (value === "Apto") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (value === "Documento") return "bg-amber-100 text-amber-700 border-amber-200";
  if (value === "Vencido") return "bg-red-100 text-red-700 border-red-200";
  return "bg-blue-100 text-blue-700 border-blue-200";
};

const docPill = (status) => {
  const up = (status || "").toUpperCase();
  if (up === "NO PRAZO") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (up === "PRAZO CRÍTICO" || up === "PRÓXIMO DO VENCIMENTO" || up === "PROXIMO DO VENCIMENTO") return "bg-amber-100 text-amber-700 border-amber-200";
  if (up === "VENCIDO") return "bg-red-100 text-red-700 border-red-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
};

const docPriority = (doc) => {
  const up = (doc.status || "").toUpperCase();
  if (up === "VENCIDO") return 3;
  if (up === "PRAZO CRÍTICO" || up === "PRÓXIMO DO VENCIMENTO" || up === "PROXIMO DO VENCIMENTO") return 2;
  if (doc.dias !== null && doc.dias >= 0 && doc.dias <= 30) return 2;
  if (up === "NO PRAZO") return 1;
  return 0;
};

function KpiCard({ title, value, icon: Icon, subtitle }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {subtitle ? <p className="text-xs text-slate-500 mt-1">{subtitle}</p> : null}
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentCell({ doc }) {
  return (
    <div className={`inline-flex flex-col rounded-xl border px-2 py-1 min-w-[116px] ${docPill(doc.status)}`}>
      <span className="text-[11px] font-semibold">{doc.nome}</span>
      <span className="text-[11px]">{doc.status}</span>
      {doc.vencimento ? <span className="text-[10px] opacity-80">{doc.vencimento}</span> : null}
      {doc.dias !== null ? <span className="text-[10px] opacity-80">{doc.dias} d</span> : null}
    </div>
  );
}

export default function App() {
  const contracts = useMemo(
    () => Array.from(new Set(fleetData.map((item) => item.contrato))).sort((a, b) => a.localeCompare(b)),
    []
  );

  const [selectedContract, setSelectedContract] = useState("TODOS");
  const [selectedSelection, setSelectedSelection] = useState("TODOS");
  const [selectedSituation, setSelectedSituation] = useState("TODOS");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("GERAL");

  const filteredData = useMemo(() => {
    return fleetData.filter((item) => {
      const byContract = selectedContract === "TODOS" || item.contrato === selectedContract;
      const bySituation = selectedSituation === "TODOS" || item.situacao === selectedSituation;
      const bySelection =
        selectedSelection === "TODOS" ||
        (selectedSelection === "POR_CONTRATO" && !item.disponivelLocacao) ||
        (selectedSelection === "DISPONIVEL_LOCACAO" && item.disponivelLocacao) ||
        (selectedSelection === "DOCUMENTO_VENCER" && item.temDocumentoVencendo) ||
        (selectedSelection === "SEM_PENDENCIA" && !item.temDocumentoVencendo);

      const term = search.trim().toLowerCase();
      const haystack = `${item.contrato} ${item.placa} ${item.modelo} ${item.tipo} ${item.locadora} ${item.frente} ${item.tag} ${item.geoson} ${item.observacao || ""}`.toLowerCase();
      return byContract && bySituation && bySelection && (!term || haystack.includes(term));
    });
  }, [selectedContract, selectedSelection, selectedSituation, search]);

  const summary = useMemo(() => {
    const total = filteredData.length;
    const aptos = filteredData.filter((item) => item.documentoResumo === "Apto").length;
    const documento = filteredData.filter((item) => item.documentoResumo === "Documento").length;
    const vencidos = filteredData.filter((item) => item.documentoResumo === "Vencido").length;
    const locacao = filteredData.filter((item) => item.disponivelLocacao).length;
    return { total, aptos, documento, vencidos, locacao };
  }, [filteredData]);

  const pieData = [
    { name: "Apto", value: summary.aptos },
    { name: "Documento", value: summary.documento },
    { name: "Vencido", value: summary.vencidos },
    { name: "Disponível para locação", value: summary.locacao },
  ].filter((item) => item.value > 0);

  const ranking = useMemo(() => {
    const grouped = new Map();
    filteredData.forEach((item) => {
      if (!grouped.has(item.contrato)) {
        grouped.set(item.contrato, { contrato: item.contrato, total: 0, vencendo: 0, vencido: 0, locacao: 0 });
      }
      const current = grouped.get(item.contrato);
      current.total += 1;
      if (item.documentoResumo === "Documento") current.vencendo += 1;
      if (item.documentoResumo === "Vencido") current.vencido += 1;
      if (item.disponivelLocacao) current.locacao += 1;
    });
    return Array.from(grouped.values()).sort((a, b) => b.total - a.total).slice(0, 15);
  }, [filteredData]);

  const selectedContractRows = useMemo(() => {
    if (selectedContract === "TODOS") return [];
    return filteredData.filter((item) => item.contrato === selectedContract);
  }, [filteredData, selectedContract]);

  const contractDocSummary = useMemo(() => {
    if (!selectedContractRows.length) return [];
    return DOC_NAMES.map((name, index) => {
      const counts = { nome: name, vencido: 0, vencendo: 0, ok: 0, na: 0 };
      selectedContractRows.forEach((row) => {
        const doc = row.docs[index];
        const up = (doc?.status || "N/A").toUpperCase();
        if (up === "VENCIDO") counts.vencido += 1;
        else if (up === "PRAZO CRÍTICO" || up === "PRÓXIMO DO VENCIMENTO" || up === "PROXIMO DO VENCIMENTO" || (doc?.dias !== null && doc?.dias >= 0 && doc?.dias <= 30)) counts.vencendo += 1;
        else if (up === "NO PRAZO") counts.ok += 1;
        else counts.na += 1;
      });
      return counts;
    });
  }, [selectedContractRows]);

  const urgentRows = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => {
        const maxA = Math.max(...a.docs.map((doc) => docPriority(doc)));
        const maxB = Math.max(...b.docs.map((doc) => docPriority(doc)));
        if (maxB !== maxA) return maxB - maxA;
        const minDiasA = Math.min(...a.docs.map((doc) => (doc.dias ?? 9999)));
        const minDiasB = Math.min(...b.docs.map((doc) => (doc.dias ?? 9999)));
        return minDiasA - minDiasB;
      })
      .slice(0, 20);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-blue-700 text-white px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-100">Geominas • Controle de Frota</p>
          <h1 className="text-3xl font-bold mt-1">Dashboard por contrato e locação</h1>
          <p className="text-blue-100 mt-2">
            Veículos organizados por contrato, com aba para disponíveis para locação e identificação rápida de documentos para vencer.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => setViewMode("GERAL")} className={`rounded-2xl ${viewMode === "GERAL" ? "" : "bg-slate-700 hover:bg-slate-800"}`}>Visão geral</Button>
          <Button onClick={() => setViewMode("CONTRATO")} className={`rounded-2xl ${viewMode === "CONTRATO" ? "" : "bg-slate-700 hover:bg-slate-800"}`}>Tela do contrato</Button>
        </div>

        <Card className="rounded-3xl shadow-sm border-slate-200 mb-6">
          <CardContent className="p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
              <div className="xl:col-span-2 relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar contrato, placa, modelo, tag, locadora..."
                  className="pl-9 h-11 rounded-2xl"
                />
              </div>

              <Select value={selectedContract} onValueChange={setSelectedContract}>
                <SelectTrigger className="h-11 rounded-2xl">
                  <SelectValue placeholder="Contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos os contratos</SelectItem>
                  {contracts.map((contract) => (
                    <SelectItem key={contract} value={contract}>{contract}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSelection} onValueChange={setSelectedSelection}>
                <SelectTrigger className="h-11 rounded-2xl">
                  <SelectValue placeholder="Seleção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="POR_CONTRATO">Somente por contrato</SelectItem>
                  <SelectItem value="DISPONIVEL_LOCACAO">Disponíveis para locação</SelectItem>
                  <SelectItem value="DOCUMENTO_VENCER">Com documento para vencer</SelectItem>
                  <SelectItem value="SEM_PENDENCIA">Sem pendência documental</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSituation} onValueChange={setSelectedSituation}>
                <SelectTrigger className="h-11 rounded-2xl">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Ativo e inativo</SelectItem>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <KpiCard title="Total de veículos" value={summary.total} icon={Truck} subtitle={selectedContract === "TODOS" ? "Base filtrada" : selectedContract} />
          <KpiCard title="Sem pendência" value={summary.aptos} icon={CheckCircle2} subtitle="Documentos em dia" />
          <KpiCard title="Documento para vencer" value={summary.documento} icon={AlertTriangle} subtitle="Atenção imediata" />
          <KpiCard title="Disponíveis para locação" value={summary.locacao} icon={KeyRound} subtitle={`${summary.vencidos} com vencido`} />
        </div>

        {viewMode === "GERAL" ? (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              <Card className="xl:col-span-2 rounded-3xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Distribuição da base</CardTitle>
                </CardHeader>
                <CardContent className="h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={90} outerRadius={145} paddingAngle={4}>
                        {pieData.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 -mt-8">
                    {pieData.map((item) => (
                      <div key={item.name} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-center">
                        <p className="text-xs text-slate-500">{item.name}</p>
                        <p className="font-bold text-slate-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="xl:col-span-3 rounded-3xl shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Contratos com mais veículos</CardTitle>
                </CardHeader>
                <CardContent className="h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ranking} layout="vertical" margin={{ left: 24, right: 16, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="contrato" type="category" width={220} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="total" radius={[0, 8, 8, 0]} fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl shadow-sm border-slate-200 mt-6">
              <CardHeader>
                <CardTitle className="text-slate-900">Prioridade documental</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {urgentRows.map((item) => (
                    <div key={`${item.contrato}-${item.placa}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-500">{item.contrato}</p>
                          <p className="text-lg font-bold text-slate-900">{item.placa}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${summaryPill(item.documentoResumo)}`}>{item.documentoResumo}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.modelo}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.docs.filter((doc) => docPriority(doc) >= 2).slice(0, 3).map((doc) => <DocumentCell key={doc.nome} doc={doc} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Tela separada por contrato</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContract === "TODOS" ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  Selecione um contrato para abrir a tela detalhada.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <KpiCard title="Veículos do grupo" value={selectedContractRows.length} icon={FolderKanban} subtitle={selectedContract} />
                    <KpiCard title="Sem pendência" value={selectedContractRows.filter((item) => item.documentoResumo === "Apto").length} icon={CheckCircle2} subtitle="Documentação ok" />
                    <KpiCard title="Documento para vencer" value={selectedContractRows.filter((item) => item.documentoResumo === "Documento").length} icon={AlertTriangle} subtitle="Ação preventiva" />
                    <KpiCard title="Com vencido" value={selectedContractRows.filter((item) => item.documentoResumo === "Vencido").length} icon={FileWarning} subtitle="Ação imediata" />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {contractDocSummary.map((item) => (
                      <Card key={item.nome} className="rounded-2xl border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                          <p className="font-semibold text-slate-900">{item.nome}</p>
                          <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                            <div className="rounded-xl bg-red-50 p-2">
                              <p className="text-xs text-slate-500">Vencido</p>
                              <p className="font-bold text-red-600">{item.vencido}</p>
                            </div>
                            <div className="rounded-xl bg-amber-50 p-2">
                              <p className="text-xs text-slate-500">Vencendo</p>
                              <p className="font-bold text-amber-600">{item.vencendo}</p>
                            </div>
                            <div className="rounded-xl bg-emerald-50 p-2">
                              <p className="text-xs text-slate-500">No prazo</p>
                              <p className="font-bold text-emerald-600">{item.ok}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-2">
                              <p className="text-xs text-slate-500">N/A</p>
                              <p className="font-bold text-slate-600">{item.na}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="rounded-3xl shadow-sm border-slate-200 mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-900">Detalhamento da frota</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1950px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="text-left py-3 pr-4 font-medium">Contrato</th>
                      <th className="text-left py-3 pr-4 font-medium">Placa</th>
                      <th className="text-left py-3 pr-4 font-medium">Modelo</th>
                      <th className="text-left py-3 pr-4 font-medium">Locadora</th>
                      <th className="text-left py-3 pr-4 font-medium">Disponibilidade</th>
                      <th className="text-left py-3 pr-4 font-medium">Situação documental</th>
                      <th className="text-left py-3 pr-4 font-medium">CRLV</th>
                      <th className="text-left py-3 pr-4 font-medium">QR Code</th>
                      <th className="text-left py-3 pr-4 font-medium">Crachá</th>
                      <th className="text-left py-3 pr-4 font-medium">CIV</th>
                      <th className="text-left py-3 pr-4 font-medium">CIPP</th>
                      <th className="text-left py-3 pr-4 font-medium">Tacógrafo</th>
                      <th className="text-left py-3 pr-4 font-medium">GEOSON</th>
                      <th className="text-left py-3 pr-4 font-medium">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={`${item.contrato}-${item.placa}-${item.geoson}`} className="border-b border-slate-100 hover:bg-slate-50 align-top">
                        <td className="py-3 pr-4 font-medium text-slate-800">{item.contrato}</td>
                        <td className="py-3 pr-4 text-slate-700">{item.placa}</td>
                        <td className="py-3 pr-4 text-slate-700 min-w-[280px]">{item.modelo}</td>
                        <td className="py-3 pr-4 text-slate-700">{item.locadora}</td>
                        <td className="py-3 pr-4 text-slate-700">{item.disponivelLocacao ? "Disponível para locação" : item.statusOperacional}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${summaryPill(item.documentoResumo)}`}>{item.documentoResumo}</span>
                        </td>
                        {item.docs.map((doc) => (
                          <td key={doc.nome} className="py-3 pr-4">
                            <DocumentCell doc={doc} />
                          </td>
                        ))}
                        <td className="py-3 pr-4 text-slate-700">{item.geoson}</td>
                        <td className="py-3 pr-4 text-slate-700 min-w-[180px]">{item.observacao || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
