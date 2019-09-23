export interface ISummaryEntry {
    Date: string;

    Jahr: number;
    GrundkostenSchluessel: number;
    VerbrauchskostenSchluessel: number;

    Mieteinheit: string;
    Mieteinheiten_ID: string;
    Lage: string;

    Personenzahl: number;
    Namen: string;

    GrundAnteile: number;

    VerbrauchsAnteile: number; // lt. Abrechnung

    GrundkostenVorschuss: number; // monatl. gezahlte Grundkosten in Miete pro Person
    VerbrauchskostenVorschuss: number; // monatl. Verbrauchskosten in Miete pro Person
    
    // calculated
    HeizungGrundkosten: number;
    HeizungVerbrauchskosten: number;
    SummeHeizung: number;

    WasserGrundkosten: number;
    WasserVerbrauchskosten: number;
    SummeWasser: number;

    SummeGesamt: number;

    GrundkostenGezahlt: number;
    VerbrauchskostenGezahlt: number;
    SummeGezahlt: number;

    DifferenzGrundkosten: number;
    DifferenzVerbrauchskosten: number;
    Differenz: number;

    Negativ: boolean;
    RawXml: string;

    SchlussSatz: string;
}