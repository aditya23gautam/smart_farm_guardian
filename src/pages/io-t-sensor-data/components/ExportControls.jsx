import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Database, Settings } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { format } from 'date-fns';

const ExportControls = ({ onExport, dateRange, selectedSensor }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportType, setExportType] = useState('filtered');
  const [customRange, setCustomRange] = useState(false);
  const [exportRange, setExportRange] = useState(dateRange);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel)', description: 'Comma-separated values' },
    { value: 'json', label: 'JSON', description: 'JavaScript Object Notation' },
    { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted report with charts' }
  ];

  const typeOptions = [
    { value: 'filtered', label: 'Current View', description: 'Export currently filtered data' },
    { value: 'all', label: 'All Sensors', description: 'Export data from all sensors' },
    { value: 'selected', label: 'Selected Sensor', description: 'Export only selected sensor data' },
    { value: 'summary', label: 'Summary Report', description: 'Aggregated statistics and insights' }
  ];

  const quickRanges = [
    { label: 'Last Hour', hours: 1 },
    { label: 'Last 6 Hours', hours: 6 },
    { label: 'Last 24 Hours', hours: 24 },
    { label: 'Last 3 Days', hours: 72 },
    { label: 'Last Week', hours: 168 },
    { label: 'Last Month', hours: 720 }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportParams = {
      format: exportFormat,
      type: exportType,
      dateRange: exportRange,
      selectedSensor,
      includeMetadata,
      timestamp: new Date()?.toISOString()
    };

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      await onExport(exportFormat, exportType, exportParams);
      
      // Show success notification or download
      console.log('Export completed:', exportParams);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleQuickRange = (hours) => {
    const endDate = new Date();
    const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
    setExportRange({ startDate, endDate });
  };

  const formatIcon = {
    csv: FileSpreadsheet,
    json: Database,
    xlsx: FileSpreadsheet,
    pdf: FileText
  };

  const FormatIcon = formatIcon?.[exportFormat] || Download;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <Download className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Format */}
        <div className="space-y-4">
          <Select
            label="Export Format"
            value={exportFormat}
            onChange={setExportFormat}
            options={formatOptions}
            className="w-full"
          />

          <Select
            label="Data Type"
            value={exportType}
            onChange={setExportType}
            options={typeOptions}
            className="w-full"
          />

          {/* Metadata Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Additional Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeMetadata}
                  onChange={(e) => setIncludeMetadata(e?.target?.checked)}
                  className="rounded border-border"
                />
                Include sensor metadata and thresholds
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={customRange}
                  onChange={(e) => setCustomRange(e?.target?.checked)}
                  className="rounded border-border"
                />
                Use custom date range
              </label>
            </div>
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="space-y-4">
          {!customRange ? (
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Quick Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                {quickRanges?.map((range) => (
                  <Button
                    key={range?.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickRange(range?.hours)}
                    className="text-xs"
                  >
                    {range?.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Custom Date Range</label>
              <div className="space-y-2">
                <Input
                  label="Start Date"
                  type="datetime-local"
                  value={format(exportRange?.startDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setExportRange(prev => ({
                    ...prev,
                    startDate: new Date(e.target.value)
                  }))}
                />
                <Input
                  label="End Date"
                  type="datetime-local"
                  value={format(exportRange?.endDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setExportRange(prev => ({
                    ...prev,
                    endDate: new Date(e.target.value)
                  }))}
                />
              </div>
            </div>
          )}

          {/* Export Preview */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Export Preview</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</div>
              <div>Type: {typeOptions?.find(t => t?.value === exportType)?.label}</div>
              <div>Range: {format(exportRange?.startDate, 'MMM dd, yyyy')} - {format(exportRange?.endDate, 'MMM dd, yyyy')}</div>
              <div>Estimated size: ~2.4 MB</div>
              <div>Est. records: 1,247</div>
            </div>
          </div>
        </div>
      </div>
      {/* Export Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Ready to export {exportType} data as {exportFormat?.toUpperCase()}
          </div>
          
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <FormatIcon className="w-4 h-4" />
            )}
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>
      </div>
      {/* Export History */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Recent Exports</h4>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {[
            { name: 'sensor_data_2025_01_24.csv', size: '2.1 MB', date: '2 hours ago' },
            { name: 'monthly_report_january.pdf', size: '4.8 MB', date: '1 day ago' },
            { name: 'greenhouse_metrics.json', size: '856 KB', date: '3 days ago' }
          ]?.map((file, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{file?.name}</div>
                  <div className="text-xs text-muted-foreground">{file?.size} • {file?.date}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportControls;