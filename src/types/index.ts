export interface LeadFormData {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
}

export interface DaySchedule {
  dia: string;
  fase: string;
  titulo: string;
  desc: string;
  entregable: string;
}

export interface TargetAudience {
  tipo: string;
  frase: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
